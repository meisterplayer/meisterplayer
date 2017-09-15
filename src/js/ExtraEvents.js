class ExtraEvents {
    static register(meisterInstance) {
        window.onfocus = () => {
            meisterInstance.eventHandler.trigger('windowFocusChange', {
                onForeground: true,
            });
        };

        window.onblur = () => {
            meisterInstance.eventHandler.trigger('windowFocusChange', {
                onForeground: false,
            });
        };

        document.addEventListener('visibilitychange', () => {
            meisterInstance.eventHandler.trigger('windowVisibilityChange', {
                visibility: document.visibilityState,
            });
        });

        document.addEventListener('webkitfullscreenchange', () => {
            meisterInstance.eventHandler.trigger('playerFullscreen');
        });

        document.addEventListener('mozfullscreenchange', () => {
            meisterInstance.eventHandler.trigger('playerFullscreen');
        });

        document.addEventListener('fullscreenchange', () => {
            meisterInstance.eventHandler.trigger('playerFullscreen');
        });

        document.addEventListener('MSFullscreenchange', () => {
            meisterInstance.eventHandler.trigger('playerFullscreen');
        });
    }
}

export default ExtraEvents;
