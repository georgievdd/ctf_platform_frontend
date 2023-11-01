import {ILink} from "./components/header";

export const addTokenToBuffer = () => {
    navigator.clipboard.writeText(window.localStorage.getItem("accessJwt")!)
}

export function prepareLinks(links: ILink[]) {
    const linkObject: { [key: string]: { index: number } } = {};

    for (let i = 0; i < links.length; i++) {
        linkObject[links[i].to] = { index: i };
    }

    return linkObject;
}