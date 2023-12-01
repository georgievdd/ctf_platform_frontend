import {ILink} from "./components/header";

export const addTokenToBuffer = () => {
    navigator.clipboard.writeText(window.localStorage.getItem("accessJwt")!)
}
export const addStringBuffer = (data: string) => {
    navigator.clipboard.writeText(data)
}

export function prepareLinks(links: ILink[]) {
    const linkObject: { [key: string]: { index: number } } = {};

    for (let i = 0; i < links.length; i++) {
        linkObject[links[i].to] = { index: i };
    }

    return linkObject;
}

export const showAlert = (message: string, variant?: 'alert-danger' | 'alert-success') => {
    // Create a div element
    const alertDiv = document.createElement('div');

    // Apply class and message
    alertDiv.className = variant || 'alert-danger';
    alertDiv.innerText = message;

    // Append to body
    document.body.appendChild(alertDiv);

    // Remove after 3 seconds
    setTimeout(() => {
        document.body.removeChild(alertDiv);
    }, 2000);
}