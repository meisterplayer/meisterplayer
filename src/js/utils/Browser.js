// 'Inspired' by https://github.com/clappr/clappr/blob/master/src/components/browser.js

const Browser = {};

const userAgent = navigator.userAgent;

const browserInfo = () => {
    const uaRegEx = /\b(playstation 4|nx|opera|chrome|edge|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i; //eslint-disable-line
    let parts = userAgent.match(uaRegEx) || [];
    let extra;

    if (/trident/i.test(parts[1])) {
        extra = /\brv[ :]+(\d+)/g.exec(userAgent) || [];
        return { name: 'IE', version: parseInt(extra[1] || '', 10) };
    } else if (parts[1] === 'Chrome') {
        extra = userAgent.match(/\bOPR\/(\d+)/);
        if (extra !== null) {
            return { name: 'Opera', version: parseInt(extra[1], 10) };
        }

        extra = userAgent.match(/\bEdge\/(\d+\.\d+)/);
        if (extra !== null) {
            return { name: 'Edge', version: parseFloat(extra[1]) };
        }
    }
    parts = parts[2] ? [parts[1], parts[2]] : [navigator.appName, navigator.appVersion, '-?'];

    extra = userAgent.match(/version\/(\d+)/i);
    if (extra) {
        parts.splice(1, 1, extra[1]);
    }

    return { name: parts[0], version: parseInt(parts[1], 10) };
};

const info = browserInfo();

Browser.isSafari = /safari/i.test(userAgent) && userAgent.indexOf('Chrome') === -1;
Browser.isEdge = /edge/i.test(userAgent);
Browser.isChrome = /chrome/i.test(userAgent) && !Browser.isEdge;
Browser.isChrome64 = Browser.isChrome && /\bx64/i.test(userAgent);
Browser.isFirefox = /firefox/i.test(userAgent);
Browser.isLegacyIE = !!(window.ActiveXObject);
Browser.isIE = Browser.isLegacyIE || /trident.*rv:1\d/i.test(userAgent);
Browser.isIE11 = /trident.*rv:11/i.test(userAgent);
Browser.isChromecast = Browser.isChrome && /CrKey/i.test(userAgent);
Browser.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone|IEMobile|Opera Mini/i.test(userAgent); //eslint-disable-line
Browser.isiOS = /iPad|iPhone|iPod/i.test(userAgent);

Browser.isAndroid = /Android/i.test(userAgent);
Browser.isWindowsPhone = /Windows Phone/i.test(userAgent);
Browser.isWin8App = /MSAppHost/i.test(userAgent);
Browser.isWiiU = /WiiU/i.test(userAgent);
Browser.isPS4 = /PlayStation 4/i.test(userAgent);
Browser.isSamsungBrowser = /SamsungBrowser/i.test(userAgent);
Browser.isSamsung = /SAMSUNG/i.test(userAgent);
Browser.isMacintosh = /Macintosh/i.test(userAgent);
Browser.isFacebook = /FBAN/i.test(userAgent) && /FBAV/i.test(userAgent);

Browser.name = info.name;
Browser.version = info.version;

export default Browser;
