


export const track = (label, payload = {}) => {

    if(window.analytics){
        analytics.track(label, payload);
    }
}

