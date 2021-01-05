import React, {useState, useEffect} from 'react'
import { Spinner, Col, Container, Card, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { db } from '../../firebase';

const Album = () => {
    const { albumId } = useParams();
    const [album, setAlbum] = useState();
	const [images, setImages] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		db.collection('albums').doc(albumId).get().then(doc => {
			setAlbum({
				id: doc.id,
				...doc.data(),
			})
		})
	}, [albumId]);

	useEffect(() => {
		const unsubscribe = db.collection('images')
			.where('album', '==', db.collection('albums').doc(albumId))
			.orderBy("name")
			.onSnapshot(snapshot => {
				setLoading(true);
				const imgs = [];

				snapshot.forEach(doc => {
					imgs.push({
						id: doc.id,
						...doc.data(),
					});
				});

				setImages(imgs);
				setLoading(false);
			});
		return unsubscribe;
	}, [albumId]);

    if (loading) {
        return (
            <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
        )
    }

    return (
        <Container fluid className="px-4">
            <h2 className="mb-3">Album {album && album.title}</h2>

            <Row className="justify-content-md-center">
                {loading
                    ? (
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    )
                    : (
                        images.map(image => (
                            <Col xs={12} sm={6} md={4} lg={3}>
                                <Link to={`/albums/${image.id}`} key={image.id}>
                                    <Card>
                                        <Card.Img variant="top" src="holder.js/100px180" />
                                    </Card>
                                </Link>
                            </Col>
                        ))
                    )  
                }
            </Row>
        </Container>
    )
}

export default Album
