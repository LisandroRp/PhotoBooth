import { Component } from 'react';

const key ="AIzaSyCdgRdU-qT9RXGnIBSyEUNVvCJtGhai1Ck"

class ApiController extends Component {

    getRoad(direccion, transporte, okRoad) {
        let urigoogle = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins='+ direccion[0].address.geo.lat + ',' + direccion[0].address.geo.lng + '&destinations=' + direccion[1].latitude + ',' + direccion[1].longitude + '&mode=' + transporte + '&units=metric&key=' + key
        //let urigoogle = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=-34.856032,-58.503571&destinations=-34.882670,-58.497480&mode=transit&units=metric&key=AIzaSyCdgRdU-qT9RXGnIBSyEUNVvCJtGhai1Ck'

        fetch(urigoogle).then(res => {
            return res.json()
        }).catch((err) => {
            console.log(err),
            alert("No Existe Ruta con el Transporte Seleccionado");
        }).
            then(data => {
                okRoad(direccion, data);
            }).catch((err => {
                console.log(err);
                alert("No Existe Ruta con el Transporte Seleccionado");
            }));
    }
}

export default new ApiController();