"use client";

import React from 'react';
export default function Home() {
  const [url, setUrl] = React.useState<string>('');
  const [fee, setFee] = React.useState<number>(0);
  const [message, setMessage] = React.useState<string>('');

  function handleUrlChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUrl(event.target.value);
  }

  function handleFeeChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFee(Number(event.target.value));
  }

  function handleConnectClick() {
    // Aqui você pode adicionar a lógica para conectar à MetaMask
    setMessage('Conectando à MetaMask...');
  }

  return (
    <>
    <div className="container px-4 py-5">
      <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
        <div className="col-6">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png" 
            className="d-block mx-lg-auto img-fluig" width="700" height="500" 
            alt="Bitcoin Logo"
            />       
          </div>
          <div className="col-6">
            <h1 className="display-5 fw-bold lh-1 mb-3">Insert Coin</h1>
            <p className="lead">Monetize Seus Links.</p>
            <hr/>
            <p>Insira um link e ganhe Bitcoin</p>
            <div className="form-floating mb-3">
              <input type="text" className="form-control" id="url" value={url || ''} onChange={handleUrlChange}/>
              <label htmlFor="url">Link:</label>
            </div>
            <div className="row mb-3">
              <div className="col-6">
                <div className="form-floating">
                  <input type="text" className="form-control" id="fee" value={fee || 0} onChange={handleFeeChange}/>
                  <label htmlFor="fee">Taxa por clique (wei):</label>
                </div>
              </div>
              <div className="col-6">
                <button type="button" className="btn btn-primary w-100 h-100" onClick={handleConnectClick}>
                  <img src="/metamask.svg" alt="MetaMask Logo" width="32" className="me-1" />
                  Conectar e Criar Link</button>
              </div>
            </div>
            { message && (<div className="alert alert-success p-3 col-12 mt-3" role="alert">{message}</div>)}
          </div>
      </div>

    </div>
    </>
  );
}
