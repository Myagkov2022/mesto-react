import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
    const [selectedCard, setSelectedCard] = React.useState({});

    function handleEditAvatarClick () {
        setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen)
    }
    function handleEditProfileClick () {
        setIsEditProfilePopupOpen(!isEditProfilePopupOpen)
    }
    function handleAddPlaceClick () {
        setIsAddPlacePopupOpen(!isAddPlacePopupOpen)
    }

    function closeAllPopups () {
        setIsEditAvatarPopupOpen(false)
        setIsEditProfilePopupOpen(false)
        setIsAddPlacePopupOpen(false)
        setSelectedCard({})
    }

    function handleCardClick (card)  {
        setSelectedCard(card);
    }
  return (
      <div className="page">
        <Header/>
        <Main
            onEditProfile={handleEditProfileClick}
            isAddPlacePopupOpen={handleAddPlaceClick}
            isEditAvatarPopupOpen={handleEditAvatarClick}
            onCardClick={handleCardClick}
        />
        <Footer/>
          <PopupWithForm name={'profile'} title={'Редактировать профиль'} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
                      <input id="popup-name" name="name" type="text" className="form__input" placeholder="Введите свое имя"
                             minLength="2" maxLength="40" required/>
                        <span id="popup-name-error" className="form__input-error"></span>
                        <input id="popup-description" name="about" type="text" className="form__input" placeholder="О себе"
                               minLength="2" maxLength="200" required/>
                          <span id="popup-description-error" className="form__input-error"></span>
                          <button className="form__submit" type="submit">Сохранить</button>
          </PopupWithForm>
          <PopupWithForm name={'new-element'} title={'Новое место'} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
                      <input id="popup-title" name="name" type="text" className="form__input" placeholder="Название"
                             minLength="2" maxLength="30" required/>
                        <span id="popup-title-error" className="form__input-error"></span>
                        <input id="popup-link" name="link" type="url" className="form__input" placeholder="Ссылка на картинку"
                               required/>
                          <span id="popup-link-error" className="form__input-error"></span>
                          <button className="form__submit" type="submit">Сохранить</button>
          </PopupWithForm>
          <PopupWithForm name={'avatar'} title={'Обновить аватар'} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
                      <input id="popup-avatar" name="avatar" type="url" className="form__input"
                             placeholder="Ссылка на картинку" required/>
                        <span id="popup-avatar-error" className="form__input-error"></span>
                        <button className="form__submit" type="submit">Сохранить</button>
          </PopupWithForm>
          <PopupWithForm name={'delete-element'} title={'Вы уверены'} >
              <button className="form__submit" type="submit">Да</button>*/}
          </PopupWithForm>
          <ImagePopup onClose={closeAllPopups} card={selectedCard}/>
      </div>
  );
}

export default App;
