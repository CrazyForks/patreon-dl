#!/usr/bin/env node

/**
 * External downloader for embedded Vimeo videos. Obtains the appropriate URL to download from and
 * passes it to 'yt-dlp' (https://github.com/yt-dlp/yt-dlp).
 * 
 * Usage
 * -----
 * Place the following two lines in your 'patreon-dl' config file:
 *
 * [embed.downloader.vimeo]
 * exec = patreon-dl-vimeo -o "{dest.dir}/%(title)s.%(ext)s" --embed-html "{embed.html}" --embed-url "{embed.url}"
 * 
 * You can append the following additional options to the exec line if necessary:
 * --video-password "<password>": for password-protected videos
 * --yt-dlp "</path/to/yt-dlp>": if yt-dlp is not in the PATH
 * 
 * You can pass options directly to yt-dlp. To do so, add '--' to the end of the exec line, followed by the options.
 * For example:
 * exec = patreon-dl-vimeo -o "{dest.dir}/%(title)s.%(ext)s" --embed-html "{embed.html}" --embed-url "{embed.url}" -- --cookies-from-browser firefox
 * 
 * Upon encountering a post with embedded Vimeo content, 'patreon-dl' will call this script. The following then happens:
 * - This script obtains the video URL from 'embed.html' or 'embed.url'. The former ("player URL") is always preferable 
 *   since it is what's actually played within the Patreon post, and furthermore 'embed.url' sometimes returns
 *   "Page not found" (see issue: https://github.com/patrickkfkan/patreon-dl/issues/65).
 * - The URL is passed to yt-dlp.
 * - yt-dlp downloads the video from URL and saves it to 'dest.dir'. The filename is determined by the specified
 *   format '%(title)s.%(ext)s' (see: https://github.com/yt-dlp/yt-dlp?tab=readme-ov-file#output-template).
 * - Fallback to embed URL if player URL fails to download.
 * 
 */

import parseArgs from 'yargs-parser';
import spawn from '@patrickkfkan/cross-spawn';
import path from 'path';

function tryGetPlayerURL(html) {
  if (!html) {
    return null;
  }

  const regex = /https:\/\/player\.vimeo\.com\/video\/\d+/g;
  const match = regex.exec(html);
  if (match && match[0]) {
    console.log('Found Vimeo player URL from embed HTML:', match[0]);
    return match[0];
  }

  const regex2 = /src="(\/\/cdn.embedly.com\/widgets.+?)"/g;
  const match2 = regex2.exec(html);
  if (match2 && match2[1]) {
    const embedlyURL = match2[1];
    console.log('Found Embedly URL from embed HTML:', embedlyURL);
    let embedlySrc;
    try {
      const urlObj = new URL(`https:${embedlyURL}`);
      embedlySrc = urlObj.searchParams.get('src');
    }
    catch (error) {
      console.error('Error parsing Embedly URL:', error);
    }
    try {
      const embedlySrcObj = new URL(embedlySrc);
      if (embedlySrcObj.hostname === 'player.vimeo.com') {
        console.log(`Got Vimeo player URL from Embedly src: ${embedlySrc}`);
      }
      else {
        console.warn(`Embedly src "${embedlySrc}" does not correspond to Vimeo player URL`);
      }
      return embedlySrc;
    }
    catch (error) {
      console.error(`Error parsing Embedly src "${embedlySrc}":`, error);
    }
  }

  return null;
}

function getCommandString(cmd, args) {
  const quotedArgs = args.map((arg) => arg.includes(' ') ? `"${arg}"` : arg);
  return [
    cmd,
    ...quotedArgs
  ].join(' ');
}

async function download(url, o, videoPassword, ytdlpPath, ytdlpArgs) {
  let proc;
  const ytdlp = ytdlpPath || 'yt-dlp';
  const parsedYtdlpArgs = parseArgs(ytdlpArgs);
  try {
    return await new Promise((resolve, reject) => {
      let settled = false;
      const args = [];
      if (!parsedYtdlpArgs['o'] && !parsedYtdlpArgs['output']) {
        args.push('-o', o);
      }
      if (!parsedYtdlpArgs['referrer']) {
        args.push('--referer', 'https://patreon.com/');
      }
      args.push(...ytdlpArgs);
      const printArgs = [...args];
      if (videoPassword && !parsedYtdlpArgs['video-password']) {
        args.push('--video-password', videoPassword);
        printArgs.push('--video-password', '******');
      }
      args.push(url);
      printArgs.push(url);

      console.log(`Command: ${getCommandString(ytdlp, printArgs)}`);
      proc = spawn(ytdlp, args);

      proc.stdout?.on('data', (data) => {
        console.log(data.toString());
      });

      proc.stderr?.on('data', (data_1) => {
        console.error(data_1.toString());
      });

      proc.on('error', (err) => {
        if (settled) {
          return;
        }
        settled = true;
        reject(err);
      });

      proc.on('exit', (code) => {
        if (settled) {
          return;
        }
        settled = true;
        resolve(code);
      });
    });
  } finally {
    if (proc) {
      proc.removeAllListeners();
      proc.stdout?.removeAllListeners();
      proc.stderr?.removeAllListeners();
    }
  }
}

const args = parseArgs(process.argv.slice(2));
const {
  'o': _o,
  'embed-html': _embedHTML,
  'embed-url': _embedURL,
  'video-password': videoPassword,
  'yt-dlp': _ytdlpPath
} = args;
const o = _o?.trim() ? path.resolve(_o.trim()) : null;
const embedHTML = _embedHTML?.trim();
const embedURL = _embedURL?.trim();
const ytdlpPath = _ytdlpPath?.trim() ? path.resolve(_ytdlpPath.trim()) : null;
const ytdlpArgs = args['_'];

if (!o) {
  console.error('No output file specified');
  process.exit(1);
}

if (!embedHTML && !embedURL) {
  console.error('No embed HTML or URL provided');
  process.exit(1);
}

const url = tryGetPlayerURL(embedHTML) || embedURL;

if (!url) {
  console.error(`Failed to obtain video URL`);
  process.exit(1);
}

async function doDownload(_url) {
  let code = await download(_url, o, videoPassword, ytdlpPath, ytdlpArgs);
  if (code !== 0 && _url !== embedURL && embedURL) {
    console.log(`Download failed - retrying with embed URL "${embedURL}"`);
    return await doDownload(embedURL);
  }
  return code;
}

console.log(`Going to download video from "${url}"`);

doDownload(url).then((code) => {
  process.exit(code);
});
