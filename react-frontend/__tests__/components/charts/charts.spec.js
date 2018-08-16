import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import { assert } from 'chai'
import Charts from '../../../src/components/charts/charts'
import moment from 'moment'
import mockAxios from "axios";
import jsonData from '../../../__mocks__/data.json'

describe('Chart List Component', () => {
    test('calls componentDidMount() lifecycle method', () => {
        const componentDidMountSpy = spy(Charts.prototype, 'componentDidMount');
        const wrapper = shallow(<Charts exchange="binance" base="btc" quote="usdt" />);
        assert.ok(Charts.prototype.componentDidMount.calledOnce);
        componentDidMountSpy.restore();
    });

    test('clicks the update button on the card', () => {
        const wrapper = shallow( <Charts exchange="binance" base="btc" quote="usdt" /> );
        wrapper.find('span').simulate('click');
        expect(wrapper.find('span').text()).toEqual('Update')
    });

    test('sets the data to to a price history object', () => {
        const data = jsonData;
        const wrapper = shallow( <Charts exchange="binance" base="btc" quote="usdt" /> );
        wrapper.setState({ data: data , date: moment().format("MMMM Do YYYY, h:mm:ss a")});
        wrapper.find('span').simulate('click');
        expect(wrapper.find('span').text()).toEqual('Update')
    });

    test('Mocks axios call', async () => {
        mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
                data: jsonData
            })
        );
        expect(mockAxios.get).toHaveBeenCalledTimes(4);
    }); 
});