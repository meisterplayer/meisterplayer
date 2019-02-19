const errorCodes = {
    // Plugin is unable to process items of the passed type.
    WRONG_TYPE: 'MSTR-0001',
    // Plugin does not play in current browser.
    NOT_SUPPORTED: 'MSTR-0002',
    // Media type does not support drm playback in current browser.
    NO_DRM: 'MSTR-0003',
    // Media not found.
    NO_MEDIA_FOUND: 'MSTR-0404',
    // Custom Fairplay contentId function threw an error.
    FAIRPLAY_CONTENT_ID_FUNCTION_ERROR: 'MSTR-1001',
    // Graphics drive is not support (HDCP)
    HDCP_NOT_SUPPORTED: 'MSTR-1002',
};

export default errorCodes;
