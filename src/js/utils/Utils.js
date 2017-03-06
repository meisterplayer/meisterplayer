export function timeToHMS(time) {
    if (isNaN(time)) return '-';

    const hours = Math.floor(time / 3600);
    let minutes = Math.floor((time - (hours * 3600)) / 60);
    let seconds = time - (hours * 3600) - (minutes * 60);

    if (hours !== 0 && minutes < 10) {
        minutes = `0${minutes}`;
    }
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }

    if (hours !== 0) {
        return `${hours}:${minutes}:${seconds}`;
    }

    return `${minutes}:${seconds}`;
}

export function bitrateToResolution(bitrate) {
    // A negative bitrate does not make sense
    if (bitrate < 0) {
        return NaN;
    }

    const kbps = bitrate / 1000;
    return `${kbps}Kbps`;

    // let bitsps = bitrate * 8;
    // let e = Math.floor(Math.log(bitsps) / Math.log(1000));
    // let mbits = bitsps / Math.pow(1000, Math.floor(e));

    // Following what we assume the platform outputs:
    // https://www.theplatform.com/blog/publishing-mpx-accelerate/
    // if (mbits <= 2) {
    //     return '240p';
    // } else if (mbits <= 4.5) {
    //     return '360p';
    // } else if (mbits <= 9) {
    //     return '480p';
    // } else if (mbits <= 13) {
    //     return '720p';
    // } else {
    //     return '1080p';
    // }


    // Roughly following youtube guidelines:
    // https://support.google.com/youtube/answer/1722171?hl=en
    // if (mbits <= 2) {
    //     return '360p';
    // } else if (mbits <= 5) {
    //     return '480p';
    // } else if (mbits <= 8) {
    //     return '720p';
    // } else if (mbits <= 16) {
    //     return '1080p';
    // } else if (mbits <= 35) {
    //     return '1440p';
    // } else {
    //     return '2160p';
    // }
}

/**
 * Constructs a new URI by interpreting a path relative to another
 * URI.
 * @param basePath {string} a relative or absolute URI
 * @param path {string} a path part to combine with the base
 * @return {string} a URI that is equivalent to composing `base`
 * with `path`
 * @see http://stackoverflow.com/questions/470832/getting-an-absolute-url-from-a-relative-one-ie6-issue
 */
export function resolveUrl(basePath, path) {
    // use the base element to get the browser to handle URI resolution
    const oldBase = document.querySelector('base');
    const docHead = document.querySelector('head');
    const a = document.createElement('a');
    let base = oldBase;
    let oldHref;

    // prep the document
    if (oldBase) {
        oldHref = oldBase.href;
    } else {
        base = docHead.appendChild(document.createElement('base'));
    }

    base.href = basePath;
    a.href = path;
    const result = a.href;

    // clean up
    if (oldBase) {
        oldBase.href = oldHref;
    } else {
        docHead.removeChild(base);
    }
    return result;
}

/**
 * Simple evaluator if the given element is
 * an node object or not and returns a Boolean.
 * @param node {any} anything that will be evaluated if it is a Node Object
 * @see http://stackoverflow.com/a/384380
*/
export function isDOMNode(node) {
    try {
        return node instanceof HTMLElement;
    } catch (e) {
        return (typeof node === 'object') &&
            (node.nodeType === 1) && (typeof node.style === 'object') &&
            (typeof node.ownerDocument === 'object');
    }
}

/*
    Exports
------------------------------------------ */
export default {
    timeToHMS,
    bitrateToResolution,
    resolveUrl,
    isDOMNode,
};
