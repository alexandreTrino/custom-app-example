/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { Button } from 'vtex.styleguide'
import axios from 'axios'

const CSS_HANDLES = ['button', 'title']

const HelloWorld = () => {
  const [txt] = useState('Alexandre Trino')
  const [txtButton] = useState('Order Simulation!')
  const [simulation, handleSimulation] = useState('Response simulation...')
  const handles = useCssHandles(CSS_HANDLES)

  const orderSimulation = async () => {
    const response = await axios({
      url: '/api/checkout/pub/orderforms/simulation',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      data: {
        items: [
          {
            id: '57', // id test sku with infinite inventory
            quantity: '1',
            seller: '1',
          },
        ],
        country: 'MEX',
        postalCode: '11480',
      },
    })

    handleSimulation(JSON.stringify(response))
  }

  return (
    <>
      <h1 className={`${handles.title}`}>{txt}</h1>
      <Button
        onClick={() => {
          orderSimulation()
        }}
        className={`${handles.button}`}
      >
        {txtButton}
      </Button>
      <div>{simulation}</div>
    </>
  )
}

export default HelloWorld
