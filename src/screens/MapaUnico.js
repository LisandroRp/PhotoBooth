import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { FontAwesome, FontAwesome5, Entypo } from '@expo/vector-icons';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { Marker, Callout } from 'react-native-maps';
import ApiController from '../controller/ApiController';
import Carousel from 'react-native-snap-carousel';
import UserDataManager from './UserDataManager';
import { useEffect } from 'react/cjs/react.development'

const GOOGLE_MAPS_APIKEY = 'AIzaSyCdgRdU-qT9RXGnIBSyEUNVvCJtGhai1Ck';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';



const App = (props) => {
  const [carousel, setCarousel] = useState([]);
  const [idTransporte, setIdTransporte] = useState(1);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isLoadingPos, setIsLoadingPos] = useState(true);
  const [miLongitude, setMiLongitude] = useState(-58.627954);
  const [miLatitude, setMiLatitude] = useState(-34.897243);
  const [coordinates, setCoordinates] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [usuario, setUsuario] = useState(props.route.params.usuario)
  var _map = null
  var _carousel = null;

  //Tuve que hardcodear las latitudes y longitudes de los usuarios porque las que venian con los endpoint no eran validas
  //Quise usar tambien un endpoint de latitudes y longitudes random pero lo sobrecargue
  useEffect(() => {
    traerPosicion()
    setUserLocation()
  }, [])

  const setUserLocation = async (geo) => {

    var nuevoUsuario = usuario
    nuevoUsuario.address.geo.lat = -34.60376
    nuevoUsuario.address.geo.lng = -58.38162
    setUsuario(nuevoUsuario)
    okDatos(nuevoUsuario)
  }

  function okDatos(usuario) {
    var newCoordinate = []
    newCoordinate.push(usuario)
    var newCarousel = []
    newCarousel.push(usuario)
    newCarousel.push({ id_usuario: 0, nombre: 'Posicion', latitude: miLatitude, longitude: miLongitude });

    setCoordinates(newCoordinate)
    setCarousel(newCarousel)
    ApiController.getRoad(newCarousel, "Driving", okRoad.bind())
  }

  function okRoad(newCarousel, road) {
    if (road.rows[0].elements[0].status == "ZERO_RESULTS" || road.rows[0].elements[0].status == "REQUEST_DENIED") {
      newCarousel[0].distancia = 0
      newCarousel[0].tiempo = 0
      setIdTransporte(0)
      setCarousel(newCarousel)
      setIsLoadingData(false)
      return
    }
    newCarousel[0].distancia = road.rows[0].elements[0].distance.text
    newCarousel[0].tiempo = road.rows[0].elements[0].duration.text
    setCarousel(newCarousel)
    setIsLoadingData(false)
    return
  }
  const traerPosicion = async () => {
    var miNuevaLatitud = UserDataManager.getInstance().getLatitude()
    var miNuevaLongitud = UserDataManager.getInstance().getLongitude()
    miNuevaLongitud != 0 ? setMiLongitude(miNuevaLongitud) : null
    miNuevaLatitud != 0 ? setMiLatitude(miNuevaLatitud) : null
    setIsLoadingPos(false)
  }

  const onCarouselItemChange = (index) => {
    let location = carousel[index];
    if (location.nombre == "Posicion") {
      _map.animateToRegion({
        latitude: miLatitude,
        longitude: miLongitude,
        latitudeDelta: 0.09,
        longitudeDelta: 0.035
      })
    }
    else {
      _map.animateToRegion({
        latitude: location.address.geo.lat,
        longitude: location.address.geo.lng,
        latitudeDelta: 0.09,
        longitudeDelta: 0.035
      })
    }
    _carousel.snapToItem(index);
  }

  const onMarkerPressed = (location, index) => {
    _map.animateToRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.09,
      longitudeDelta: 0.035
    });

    _carousel.snapToItem(index);
  }
  function tipoDeTransporteContainer(tipo) {
    if (idTransporte == tipo) {
      return "#F28C0F"
    }
    else {
      return 'white'
    }
  }
  function tipoDeTransporteLogo(tipo) {
    if (idTransporte == tipo) {
      return "white"
    }
    else {
      return '#F28C0F'
    }
  }
  function queTransporte() {
    switch (idTransporte) {
      case 1:
        return "DRIVING"
      case 2:
        return 'TRANSIT'
      case 3:
        return 'WALKING'
      case 4:
        return 'BICYCLING'
    }
  }
  function changeTransporte(carousel, id_transporte) {
    setIsLoadingData(true)
    switch (id_transporte) {
      case 1:
        ApiController.getRoad(carousel, "driving", okRoad.bind(this))
        setIdTransporte(1)
        break;
      case 2:
        ApiController.getRoad(carousel, "transit", okRoad.bind(this))
        setIdTransporte(2)
        break;
      case 3:
        ApiController.getRoad(carousel, "walking", okRoad.bind(this))
        setIdTransporte(3)
        break;
      case 4:
        ApiController.getRoad(carousel, "bicycling", okRoad.bind(this))
        setIdTransporte(4)
        break;
    }
  }
  const volver = async () => {
    props.navigation.navigate('UsuarioEspecificoScreen', { id: usuario.id, nombre: usuario.name })
  }
  if (isLoadingPos || isLoadingData) {
    return (
      <View style={styles.container}>

        <ActivityIndicator size="large" color="#F28C0F" backgroundColor=' #616161' style={{ flex: 1 }} />
        <TouchableOpacity style={[styles.backBubble, styles.shadow]} onPress={() => volver()}>
          <Entypo name="chevron-left" size={hp(4.4)} style={{ textAlignVertical: "center" }} color={'#F28C0F'} />
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <MapView
          ref={map => _map = map}
          showsUserLocation={true}
          style={styles.map}
          initialRegion={{
            longitude: coordinates[0].address.geo.lng,
            latitude: coordinates[0].address.geo.lat,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          {
            coordinates.map((marker, index) => (
              <Marker
                key={(item) => (item.id_usuario)}
                ref={ref => markers[index] = ref}
                onPress={() => onMarkerPressed(marker, index)}
                coordinate={{ latitude: marker.address.geo.lat, longitude: marker.address.geo.lng }}
              >
                <Callout>
                  <Text>{marker.nombre}</Text>
                </Callout>

              </Marker>
            ))
          }
          <MapViewDirections
            origin={{
              latitude: miLatitude,
              longitude: miLongitude
            }}
            destination={{
              latitude: coordinates[0].address.geo.lat,
              longitude: coordinates[0].address.geo.lng
            }}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor="#F28C0F"
            mode={queTransporte()}
          />

        </MapView>
        <View style={styles.safeArea} />
        <TouchableOpacity style={[styles.backBubble, styles.shadow]} onPress={() => volver()}>
          <Entypo name="chevron-left" size={hp(4.4)} style={{ textAlignVertical: "center" }} color={'#F28C0F'} />
        </TouchableOpacity>
        <View style={styles.transportContainer}>
          <TouchableOpacity style={[styles.typeTransportContainer, styles.shadow, { backgroundColor: tipoDeTransporteContainer(1) }]} onPress={() => changeTransporte(carousel, 1)}><FontAwesome5 name="car" size={hp(3.3)} color={tipoDeTransporteLogo(1)} /></TouchableOpacity>
          {/* <TouchableOpacity style={[styles.typeTransportContainer, styles.shadow, { backgroundColor: tipoDeTransporteContainer(2) }]} onPress={() => changeTransporte(carousel, 2)}><FontAwesome5 name="bus" size={hp(3.3)} color={tipoDeTransporteLogo(2)} /></TouchableOpacity> */}
          <TouchableOpacity style={[styles.typeTransportContainer, styles.shadow, { backgroundColor: tipoDeTransporteContainer(3) }]} onPress={() => changeTransporte(carousel, 3)}><FontAwesome5 name="walking" size={hp(3.3)} color={tipoDeTransporteLogo(3)} /></TouchableOpacity>
          <TouchableOpacity style={[styles.typeTransportContainer, styles.shadow, { backgroundColor: tipoDeTransporteContainer(4) }]} onPress={() => changeTransporte(carousel, 4)}><FontAwesome5 name="bicycle" size={hp(3.3)} color={tipoDeTransporteLogo(4)} /></TouchableOpacity>
        </View>
        <Carousel
          ref={(c) => { _carousel = c; }}
          data={carousel}
          containerCustomStyle={styles.carousel}
          contentContainerCustomStyle={{ alignItems: 'center' }}
          renderItem={renderCarouselItem}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={wp(80)}
          removeClippedSubviews={false}
          onSnapToItem={(index) => onCarouselItemChange(index)}
        />
      </View>
    );
  }
}

const renderCarouselItem = ({ item }) =>
  (item.nombre == 'Posicion')
    ?
    <View style={[styles.cardContainerHome, styles.shadowCard]}>
      <FontAwesome name="home" size={hp(8)} color={"#F28C0F"} />
    </View>
    :
    <View style={[styles.cardContainer, styles.shadowCard]}>
      <View style={{ justifyContent: "center" }}>
        <View style={[styles.cardImageContainer, { borderWidth: 0 }]}>
          <Image
            source={{ uri: "https://thispersondoesnotexist.com/image" }}
            style={[styles.cardImage, { resizeMode: ((item.id_usuario == 0) ? 'contain' : 'contain') }]}
          />
        </View>
      </View>
      <View style={{ flexDirection: 'column', flex: 1 }}>
        <Text style={styles.cardTitle} numberOfLines={2}>{item.name}</Text>
        {item.username ? <Text style={styles.cardInstituto}>{item.username}</Text> : <View />}
        <Text style={styles.cardDireccion} numberOfLines={2}>{item.email}</Text>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardDistancia}>Distancia: {item.distancia}</Text>
            <Text style={styles.cardTiempo}>Duración: {item.tiempo}</Text>
          </View>
        </View>
      </View>
    </View>


{/* <MapViewDirections
  origin={{
    latitude: -34.89917857365071,
    longitude: -58.630689666256345
  }}
  destination={{
    latitude: -34.901978,
    longitude: -58.621620
  }}
  apikey={GOOGLE_MAPS_APIKEY}
  strokeWidth={3}
  strokeColor="hotpink"
  mode={queTransporte()}
/> */}
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#FFF7EE'
  },
  safeArea: {
    backgroundColor: '#F28C0F',
    height: hp(5)
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  marker: {
    backgroundColor: "#550bbc",
    padding: 5,
    borderRadius: 5,
  },
  text: {
    color: "#FFF",
    fontWeight: "bold"
  },
  backBubble: {
    position: "absolute",
    left: 0,
    alignItems: "center",
    justifyContent: "center",
    height: hp(5.5),
    width: hp(5.5),
    marginTop: hp(7),
    marginLeft: wp(4),
    borderRadius: 50,
    backgroundColor: 'white'
  },
  transportContainer: {
    position: 'absolute',
    height: 0,
    right: 0,
    marginTop: hp(10),
    marginRight: wp(5)
  },
  typeTransportContainer: {
    height: hp(5.5),
    width: hp(5.5),
    marginVertical: hp(2),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    backgroundColor: 'white'
  },
  shadow: {
    shadowColor: '#00000055',
    shadowOffset: {
      width: 2,
      height: 5,
    },
    shadowOpacity: 2,
    shadowRadius: 8,
    elevation: 55,
  },
  shadowCard: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 2,
    shadowRadius: 8,
    elevation: 55
  },
  //********************* */
  //CAROUSEL
  //********************* */
  carousel: {
    position: 'absolute',
    bottom: 0,
    paddingVertical: hp(8.8)
  },
  cardContainer: {
    backgroundColor: 'white',
    flex: 1,
    padding: hp(2),
    borderRadius: 24,
    flexDirection: 'row',
  },
  cardImageContainer: {
    height: hp(10),
    width: hp(10),
    backgroundColor: '#FFF7EE',
    borderColor: "#F28C0F",
    marginRight: wp(5),
    borderRadius: hp(10) / 2,
    justifyContent: "center"
  },
  cardImage: {
    height: "100%",
    width: "100%",
    borderRadius: hp(10) / 2,
    resizeMode: "contain"
  },
  cardTitle: {
    color: '#F28C0F',
    fontSize: wp(5.5),
    alignSelf: 'center',
    textAlign: 'center'
  },
  cardInstituto: {
    color: 'black',
    fontSize: wp(4.4),
    alignSelf: 'center',
    textAlign: 'center'
  },
  cardDireccion: {
    color: 'black',
    fontSize: wp(3),
    textAlign: 'center',
    marginTop: hp(0.5),
    marginBottom: hp(3)
  },
  cardDistancia: {
    color: 'black',
    fontSize: wp(3)
  },
  cardTiempo: {
    color: 'black',
    fontSize: wp(3)
  },
  //********************* */
  //HOME
  //********************* */
  cardContainerHome: {
    backgroundColor: 'white',
    height: hp(15),
    width: hp(15),
    padding: 24,
    borderRadius: 80,
    alignSelf: 'center',
    alignItems: 'center'
  },
})

export default App;