// Здесь вам нужно реализовать вью

// Подключите его к редакс роутеру
// Вам потребуются селекторы для получения выбранного сола
// и списка фотографий

// Так же вы будете диспатчить экшены CHANGE_SOL и FETCH_PHOTOS_REQUEST
// Эти экшены находятся в модуле ROVER PHOTOS
import React from 'react';
import {
  fetchPhotosRequest,
  fetchPhotosSuccess,
  fetchPhotosFailure,
  changeSol,
  getPhotos,
  getSol
} from '../../modules/RoverPhotos';
import { connect } from 'react-redux';
import RoverPhotos from '../RoverPhotos';

const MapStateToProps = state => ({
  photos: getPhotos(state),
  sol: getSol(state)
});
const MapDispatchToProps = {
  fetchPhotosRequest,
  fetchPhotosSuccess,
  fetchPhotosFailure,
  changeSol
};
const rovers = ['curiosity', 'opportunity', 'spirit'];

class RoversViewer extends React.PureComponent {
  componentDidMount() {
    this.props.fetchPhotosRequest();
  }
  render() {
    const { sol, photos } = this.props;
    return (
      <div>
        {rovers.map(rover => {
          return (
            photos &&
            photos[rover] &&
            photos[rover][sol.current] && (
              <RoverPhotos
                photos={photos[rover][sol.current].photos}
                name={rover}
              />
            )
          );
        })}
      </div>
    );
  }
}
export default connect(
  MapStateToProps,
  MapDispatchToProps
)(RoversViewer);
