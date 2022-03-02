import { faAddressCard, faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import CreditCard from "./CreditCard";

const PaymentForm = () => {
    const [total] = useOutletContext();
    const [cardNumber, setCardNumber] = useState('');
    const [cardExpirationYear, setCardExpirationYear] = useState('');
    const [cardExpirationMonth, setCardExpirationMonth] = useState('');
    const [cardOwnerName, setCardOwnerName] = useState('');
    const navigate = useNavigate();

    const handleCardNumber = e => setCardNumber(e.target.value.replace(/[^0-9]/g, ''));
    const handleCardExpirationYear = e => setCardExpirationYear(e.target.value.replace(/[^0-9]/g, ''));
    const handleCardExpirationMonth = e => setCardExpirationMonth(e.target.value.replace(/[^0-9]/g, ''));
    const handleCardOwnerName = e => setCardOwnerName(e.target.value.replace(/[^a-z\s\u00C0-\u024F\u1E00-\u1EFF]*$/, ''));

    return (
        <div class="modal is-active">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Amount to pay: ${total.toFixed(2)}</p>
                    <button onClick={() => navigate('../')} class="delete" aria-label="close"></button>
                </header>
                <section class="modal-card-body">
                    <div>
                        <div className='hero'>
                            <form className="column">
                                <h3 className='title is-size-4'>Card Information</h3>
                                <div class="field is-horizontal">
                                    <div className="field-label is-normal">
                                        <label className="label">Number:</label>
                                    </div>
                                    <div className="field-body">
                                        <div className="field">
                                            <p className="control is-expanded has-icons-left">
                                                <input className="input" type="tel" maxLength={16} placeholder="1234 - 5567 - 8901 - 1234" value={cardNumber} onChange={handleCardNumber} />
                                                <span className="icon is-small is-left">
                                                    <FontAwesomeIcon icon={faCreditCard} size='lg' />
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div class="field is-horizontal">
                                    <div class="field-label is-normal">
                                        <label class="label">Expiration month:</label>
                                    </div>
                                    <div class="field-body">
                                        <div class="field">
                                            <p class="control is-expanded has-icons-left">
                                                <input class="input" type="tel" placeholder="00" maxLength={2} value={cardExpirationMonth} onChange={handleCardExpirationMonth} />
                                                <span class="icon is-small is-left">
                                                    <FontAwesomeIcon icon={faCreditCard} size='lg' />
                                                </span>
                                            </p>
                                        </div>
                                        <div class="field-label is-normal">
                                            <label class="label">Expiration year:</label>
                                        </div>
                                        <div class="field">
                                            <p class="control is-expanded has-icons-left has-icons-right">
                                                <input class="input" type="tel" placeholder="00" maxLength={2} value={cardExpirationYear} onChange={handleCardExpirationYear} />
                                                <span class="icon is-small is-left">
                                                    <FontAwesomeIcon icon={faCreditCard} size='lg' />
                                                </span>
                                                <span class="icon is-small is-right">
                                                    <i class="fas fa-check"></i>
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div class="field is-horizontal">
                                    <div className="field-label is-normal">
                                        <label className="label">Name:</label>
                                    </div>
                                    <div className="field-body">
                                        <div className="field">
                                            <p className="control is-expanded has-icons-left">
                                                <input className="input" type="text" placeholder="Name" value={cardOwnerName} onChange={handleCardOwnerName} />
                                                <span className="icon is-small is-left">
                                                    <FontAwesomeIcon icon={faAddressCard} size='lg' />
                                                </span>
                                            </p>
                                            <small>Please use only lowercase letters</small>
                                        </div>
                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>

                    <div style={{height: '250px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <CreditCard number={cardNumber} expirationYear={cardExpirationYear} expirationMonth={cardExpirationMonth} theName={cardOwnerName} />
                    </div>

                </section>
                <footer class="modal-card-foot">
                    <button class="button is-success">Continue to pay</button>
                    {/* <button class="button">Cancel</button> */}
                </footer>
            </div>
        </div>
    )
}

export default PaymentForm;