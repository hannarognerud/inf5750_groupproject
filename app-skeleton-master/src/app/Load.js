import React, { Component } from 'react';
import { loadOrganisationUnits } from '../api';
import List from './List';
import Map from './Map';
import SearchItem from './Search';
import Info from './Info';

/**
 * ES2015 class component
 * https://facebook.github.io/react/docs/reusable-components.html#es6-classes-and-react.createclass
 */
export default class Load extends Component {

    constructor(props, context) {
        super(props, context);
        // Set some initial state variables that are used within the component
        this.state = {
            isSaving: false,
            isLoading: true,
            items: [],
            base: [],
        };
        this.HiItems  = this.HiItems.bind(this);
        this.emptyMap = this.emptyMap.bind(this);
        this.resetMap = this.resetMap.bind(this);
    }

    componentDidMount() {
        this.loadOrganisationUnits();
    }

    loadOrganisationUnits() {
    // Loads the organisation units from the api and sets the loading state to false and puts the items onto the component state.
        loadOrganisationUnits()
            .then((organisationUnits) => {
                this.setState({
                    isLoading: false,
                    items: organisationUnits,
                    base: organisationUnits, //added this so I can get back to initial state (bad solution)
                });
            });
    }

    HiItems(items){
        var test = [];
        var a = [];
        a = this.state.items;

        for(var i=0; i<items.length; i++){
          for(var j=0; j<a.length; j++){
            if(items[i].value == a[j].shortName){
              test[i]=a[j];
              //console.log(test[i]);
            }
        }
      }
      console.log(test.length);
      this.setState({base: test });    
    }

    emptyMap(){
       this.setState({base: [] }); 
    }

    resetMap(){
        this.setState({base: this.state.items});
    }

    render() {
        const center = {
            lat: 8.431759,
            lng: -11.743826
        }
        //console.log(this.state.items);
        // Render the app which includes the list component and the form component
        // We hide the form component when we are in the saving state.
        return (

            <div className="mapAndList">
                <div>
                    <Info/>
                </div>
                <div className="listDiv">
                    <SearchItem items={this.state.items} HiItems={this.HiItems}/> 
                </div>
                <div className ="mapDiv">
                    <Map center={center} items={this.state.base}/>
                </div>
                <div className="buttons">
                    <button onClick = {this.emptyMap}>empty map</button>
                    <button onClick = {this.resetMap}>show all</button>
                </div>
            </div>
        );
    }
}
