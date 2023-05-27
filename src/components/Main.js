import React from "react";
import api from "../utils/api"
import Card from "./Card";
function Main (props) {
    const [userName, setUserName] = React.useState('')
    const [userDescription, setUserDescription] = React.useState('')
    const [userAvatar, setUserAvatar] = React.useState('')
    const [cards, setCards] = React.useState([])

    React.useEffect(() => {

        Promise.all([api.getInitialCards(), api.getUserInfo()])
            .then(([initialCards, user]) => {
                setCards(initialCards);
                setUserName(user.name);
                setUserAvatar(user.avatar)
                setUserDescription(user.about)
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            });
    },[])

    return (
        <main className="content">
            <section className="profile content__profile">
                <img className="profile__avatar" src={userAvatar} alt="Аватарка пользователя"/>
                <button className="profile__avatar-edit" type="button" onClick={props.isEditAvatarPopupOpen} ></button>
                <div className="profile__info">
                    <h1 className="profile__name">{userName}</h1>
                    <p className="profile__description">{userDescription}</p>
                    <button className="profile__edit" type="button" onClick={props.onEditProfile}></button>
                </div>
                <button className="profile__add-button" type="button" onClick={props.isAddPlacePopupOpen}/>
            </section>
            <section className="elements content__elements">
                <ul className="elements__list">
                    {cards.map(card => (
                            <Card key={card._id} card={card} onCardClick={props.onCardClick}/>
                        )
                    )}
                </ul>
            </section>
        </main>
    )
}
export default Main;