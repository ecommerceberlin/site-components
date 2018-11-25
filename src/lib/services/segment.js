


export const track = (label, payload = {}) => {

    if(typeof window !== "undefined" && window.analytics){
        window.analytics.track(label, payload);
    }
}

