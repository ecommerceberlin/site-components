


export const track = (label, payload = {}) => {

    if(typeof window !== "undefined" && window.analytics){
        analytics.track(label, payload);
    }
}

