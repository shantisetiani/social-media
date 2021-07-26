import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Modal } from "react-bootstrap";
import { AlbumApi } from "../../api";
import useApiCall from "../../customHooks/useApiCall";

import { Loader, Break } from "../../components";
import "./style.css";

function AlbumDetail() {
  const [albumDetail, setAlbumDetail] = useState({});
  const [photos, setPhotos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({});

  // Get Id from url
  const splittedUrl = window.location.pathname.split("/");
  const albumId = splittedUrl[splittedUrl.length - 1];

  /* Get data using custom hooks - START */
  const albumResult = useApiCall({
    ApiCall: AlbumApi.getAlbumDetail,
    params: albumId,
  });
  const photosResult = useApiCall({
    ApiCall: AlbumApi.getPhotosByAlbum,
    params: albumId,
  });
  /* Get data using custom hooks - END */

  /* Put Data into local state - START */
  useEffect(() => {
    if (albumResult.response !== null) {
      setAlbumDetail(albumResult.response);
    }
  }, [albumResult.response]);

  useEffect(() => {
    if (photosResult.response !== null) {
      setPhotos(photosResult.response);
    }
  }, [photosResult.response]);
  /* Put Data into local state - END */

  const openModal = (data) => {
    setShowModal(true);
    setModalInfo({
      title: data.title,
      imgUrl: data.url,
    });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <Container className="container-pages">
      {albumResult.loading || photosResult.loading ? (
        <Loader />
      ) : (
        <Row>
          <Col xs="12">
            <h3>{albumDetail.title}</h3>
          </Col>
          <Break height={10} />
          {photos?.map((item, idx) => (
            <Col xs="6" sm="4" lg="3" key={idx}>
              <Card className="card-photos" onClick={() => openModal(item)}>
                <Card.Img variant="top" src={item.thumbnailUrl} />
              </Card>
            </Col>
          ))}
          <Modal show={showModal} onHide={closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>{modalInfo.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <img src={modalInfo.imgUrl} />
            </Modal.Body>
          </Modal>
        </Row>
      )}
    </Container>
  );
}

export default AlbumDetail;
