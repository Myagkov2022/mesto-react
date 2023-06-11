import React, {useState, useEffect} from "react";
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
    const [cards, setCards] = useState([]);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [deletedCard, setDeletedCard] = useState('');
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        Promise.all([api.getInitialCards(), api.getUserInfo()])
            .then(([initialCards, user]) => {
                setCards(initialCards);
                setCurrentUser(user)
            })
            .catch((err) => {
                console.log(`Ошибка загрузки карточек:\n ${err.status} \n ${err.text}`);
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
                console.log(`Ошибка постановки/удаления лайка:\n ${err.status} \n ${err.text}`);
            });
    }

    function handleCardDelete() {
        api.deleteCard(deletedCard)
          .then(res => {
              console.log(res)
              setCards((state) => state.filter((c) => c._id !== deletedCard));
              closeAllPopups()
          })
            .catch(err => {
                console.log(`Ошибка удаление карточки:\n ${err.status} \n ${err.text}`);
            });
    }

    function handleUpdateUser(userInfo) {
         api.patchUserInfo(userInfo)
             .then(res => {
                 setCurrentUser(res)
                 closeAllPopups()
         })
             .catch(err => {
                 console.log(`Ошибка обновления данных пользователя:\n ${err.status} \n ${err.text}`);
             });
    }

    function handleUpdateAvatar(avatar) {
        api.patchUserAvatar(avatar)
            .then(res => {
                setCurrentUser(res)
                closeAllPopups()
        })
            .catch(err => {
                console.log(`Ошибка обновления аватара пользователя:\n ${err.status} \n ${err.text}`);
            });
    }

    function handleAddPlaceSubmit(card) {
        api.postNewCard(card)
            .then(res => {
                setCards([res, ...cards]);
                closeAllPopups()
            })
            .catch(err => {
                console.log(`Ошибка добавления нового места:\n ${err.status} \n ${err.text}`);
            });
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
