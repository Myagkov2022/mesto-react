import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import {CurrentUserContext} from '../contexts/CurrentUserContext'
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";

function App() {
    const [cards, setCards] = React.useState([]);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({});
    const [deletedCard, setDeletedCard] = React.useState({});
    const [currentUser, setCurrentUser] = React.useState({});

    React.useEffect(() => {
        Promise.all([api.getInitialCards(), api.getUserInfo()])
            .then(([initialCards, user]) => {
                setCards(initialCards);
                setCurrentUser(user)
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            });
    },[])

    function handleEditAvatarClick () {
        setIsEditAvatarPopupOpen(true)
    }
    function handleEditProfileClick () {
        setIsEditProfilePopupOpen(true)
    }
    function handleAddPlaceClick () {
        setIsAddPlacePopupOpen(true)
    }
    function handleDeletePopupClick (id) {
        setIsDeleteCardPopupOpen(true)
        setDeletedCard(id)
    }

    function closeAllPopups () {
        setIsEditAvatarPopupOpen(false)
        setIsEditProfilePopupOpen(false)
        setIsAddPlacePopupOpen(false)
        setIsDeleteCardPopupOpen(false)
        setSelectedCard({})
        setDeletedCard({})
    }

    function handleCardClick (card)  {
        setSelectedCard(card);
    }

    function handleCardLike(card) {

        const isLiked = card.likes.some(i => i._id === currentUser._id);
        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch(err => {
                console.log(`Ошибка загрузки данных:\n ${err.text}`);
            });
    }

    function handleCardDelete() {
        api.deleteCard(deletedCard)
          .then(res => {
              console.log(res)
              setCards((state) => state.filter((c) => c._id !== deletedCard));
              closeAllPopups()
          })
    }

    function handleUpdateUser(userInfo) {
         api.patchUserInfo(userInfo).then(res => {
             setCurrentUser(res)
             closeAllPopups()
         })
    }

    function handleUpdateAvatar(avatar) {
        api.patchUserAvatar(avatar)
            .then(res => {
                setCurrentUser(res)
                closeAllPopups()
        })
    }

    function handleAddPlaceSubmit(card) {
        api.postNewCard(card)
            .then(res => {
                setCards([res, ...cards]);
                closeAllPopups()
            })
    }

  return (
      <CurrentUserContext.Provider value={currentUser}>
          <div className="page">
            <Header/>
            <Main
                cards={cards}
                onEditProfile={handleEditProfileClick}
                isAddPlacePopupOpen={handleAddPlaceClick}
                isEditAvatarPopupOpen={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleDeletePopupClick}
            />
            <Footer/>
              <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
              <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
              <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>
              <DeleteCardPopup isOpen={isDeleteCardPopupOpen} onClose={closeAllPopups} onDel={handleCardDelete}/>
              <ImagePopup onClose={closeAllPopups} card={selectedCard}/>
          </div>
      </CurrentUserContext.Provider>
  );
}

export default App;
