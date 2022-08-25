import Gifs from "../Gifs";
import "./style.css";

function ListOfGifs({ gifs }) {
    return (
        <div className='ListOfGifs'>
            {gifs.map(({ id, title, url }) => (
                <Gifs id={id} key={id} title={title} url={url} />
            ))}
        </div>
    );
}

export default ListOfGifs;
