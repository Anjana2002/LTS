import NotFound from "./NotFound"

export default function Protected({children}) {
    const token = localStorage.getItem("token")
    if(!token) {
        return <NotFound />
    }
    return children;
}