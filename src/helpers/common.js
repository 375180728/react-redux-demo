import React, { Component } from 'react'
import ReactDOM from 'react-dom';

export function initContext(){
    console.log('aaa');
    window.React = React;
    window.ReactDOM = ReactDOM;
    window.Component = Component;
}