import React from 'react';
import { Carousel } from 'react-bootstrap';

import './style.css';

import Cards from '../Cards';
import storiesData from '../../utils/stories';

export default class ControlledCarousel extends React.Component {
  state = {
    data: [],
  };

  componentDidMount() {
    const newData = [{ id: 0, stories: [] }];
    storiesData.forEach((story, index) => {
      newData[newData.length - 1].stories.push(story);
      if ((index + 1) % 4 === 0) {
        newData.push({ id: (index + 1) / 4, stories: [] });
      }
    });
    this.setState({ data: newData });
  }

  render() {
    const { data } = this.state;

    return (
      <Carousel
        controls
        indicators
        nextIcon={<i className="slider__control fas fa-angle-double-right" />}
        prevIcon={<i className="slider__control fas fa-angle-double-left" />}
      >
        {data.map(({ id, stories }) => (
          <Carousel.Item key={id}>
            <Cards data={stories} />
          </Carousel.Item>
        ))}
      </Carousel>
    );
  }
}
