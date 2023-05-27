import React from "react";
function Card(props) {

    const handleClick = () => {
        props.onCardClick(props.card);
    };
    return (
        <li className="element">
            <img className="element__image" src={props.card.link} alt={props.card.name} onClick={handleClick}/>
                <button className="element__trash" type="button"></button>
                <div className="element__description">
                    <h2 className="element__heading">{props.card.name}</h2>
                    <div className="element__likes">
                        <button className="element__heart" type="button"></button>
                        <p className="element__likes-count">{props.card.likes.length}</p>
                    </div>
                </div>
        </li>
    )
}

export default Card