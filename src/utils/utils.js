export function getType(o) {
    return Object.prototype.toString.call(o);
}

export function isNullOrUndefined(o) {
    return o === null || o === undefined;
}

export function isClientSide() {
    return typeof window !== undefined && !isNullOrUndefined(window);
}

export function getFromListById(arr, uid) {
    let chosen = arr.find((el) => el.uid === uid);
    return chosen;
}

export function removeFromListById(arr, uid) {
    if (getType(arr) !== '[object Array]') {
        throw new Error('The first argument in removeFromListById must be an array');
    } else if (getType(uid) !== '[object String]') {
        throw new Error('The second argument in removeFromListById must be a string');
    } else {
        let elToRemove = arr.find((el) => el.uid === uid);
        if (elToRemove) {
            let index = arr.indexOf(elToRemove);
            return arr.slice(0, index).concat(arr.slice(index + 1, arr.length));
        } else {
            throw new Error(`No element with uid ${uid} was found in ${arr}`);
        }
    }
}

export function updateInListById(arr, uid, propNameValueList) {
    if (getType(arr) !== '[object Array]') {
        throw new Error('The first argument in updateInListById must be an array');
    } else if (getType(uid) !== '[object String]') {
        throw new Error('The second argument in updateInListById must be a string');
    } else { 
        let elToUpdate = arr.find((el) => el.uid === uid);
        if (elToUpdate) {
            let elCopy = {...elToUpdate};
            propNameValueList.forEach((nvPair) => {
                let {name, value} = nvPair;
                elCopy[name] = value;
            });
            let index = arr.indexOf(elToUpdate);
            let a1 = arr.slice(0, index);
            let a2 = arr.slice(index + 1, arr.length);
            return a1.concat([elCopy], a2);
        }

    }
}

export function escapeSpecialChars(string){
    return string.replace(/[<>{}()|[\]\\]/g, '');
}

export function $id(id) {
    if (isClientSide) {
        return document.getElementById(id);
    }
}