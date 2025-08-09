"use client";
import React from "react";
import { useParams } from "next/navigation";
import { getLink, payLink } from "../../services/Web3Service";

type LinkType = {
  fee: string,
  url?: string,
}

export default function Home() {

  const params = useParams<{linkId: string}>();
  const [link, setLink] = React.useState<LinkType>({ fee: "0" });
  const [message, setMessage] = React.useState<string>('');

  React.useEffect(() => {
    setMessage("buscando dados do link...")
    getLink(params.linkId).then((link: LinkType | undefined) => {
      setMessage("");
      if(!link) throw "Erro ao recuperar o link";
      if(link.url) { 
        window.location.href = link.url
      } else {
        setLink(link)
      }
    }).catch(error => {
      setMessage(error.message);
      console.error(error)}
    );
  }, []);

  function handleAccessClick() {
    // Implement the logic to connect to MetaMask and pay the fee
    payLink(params.linkId, link.fee).then(() => {
      setMessage("Pagamento efetuado com sucesso.");
      return getLink(params.linkId);
    })
    .then(link => window.location.href = link?.url || "")
    .catch(error => setMessage(error.message))
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
            <h1 className="display-5 fw-bold lh-1 mb-3">Link Protegido</h1>
            <p className="lead">Este link está protegido pela Insert Coin.</p>
            <hr/>
            <p>Para acessar o conteúdo original, conecte sua carteira abaixo e confirme o pagamento da taxa de <strong>{link.fee || "0"} wei.</strong></p>
            <div className="row mb-3"> 
              <div className="col-6">
                <button type="button" className="btn btn-primary w-100 h-100" onClick={handleAccessClick}>
                  <img src="/metamask.svg" alt="MetaMask Logo" width="32" className="me-1" />
                  Pagar e Acessar Link</button>
              </div>
            </div>
            { message && (<div className="alert alert-success p-3 col-12 mt-3" role="alert">{message}</div>)}
          </div>
      </div>

    </div>
    </>
  );
}
