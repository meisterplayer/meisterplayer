import getTinyMp4 from './getTinyMp4';

/**
 * Detects if a browser can autoplay or not.
 *
 * @export
 * @returns {Promise<boolean>}
 */
export function canBrowserAutoplay() {
    return new Promise((resolve) => {
        const videoElement = document.createElement('video');
        videoElement.src = `data:video/mp4;base64,${getTinyMp4()}`;
        videoElement.setAttribute('playsinline', '');
        videoElement.setAttribute('webkit-playsinline', '');
        const playPromise = videoElement.play();

        if (playPromise !== undefined) {
            playPromise.then(() => {
                resolve(true);
            });

            playPromise.catch(() => {
                resolve(false);
            });
        } else {
            resolve(true);
        }
    });
}

/**
 * Detects if a browser can autoplay muted video or not.
 *
 * @export
 * @returns {Promise<boolean>}
 */
export function canBrowserAutoplayMuted() {
    return new Promise((resolve) => {
        const videoElement = document.createElement('video');
        videoElement.setAttribute('playsinline', '');
        videoElement.setAttribute('webkit-playsinline', '');
        videoElement.volume = 0;
        videoElement.muted = true;
        videoElement.src = `data:video/mp4;base64,${getTinyMp4()}`;
        const playPromise = videoElement.play();

        if (playPromise !== undefined) {
            playPromise.then(() => {
                resolve(true);
            });

            playPromise.catch(() => {
                resolve(false);
            });
        } else {
            resolve(true);
        }
    });
}
