import React from 'react'
import { shallow } from 'enzyme'
import { ButtonBar } from '../../../app/components/common/ButtonBar'
import Button from '@material-ui/core/Button'
import SkipNext from '@material-ui/icons/SkipNext'

describe('<ButtonBar />', () => {
  let buttonBar, props
  beforeEach(() => {
    props = {
      handleSkip: jest.fn(),
      showNext: false
    }
    buttonBar = shallow(<ButtonBar {...props} />)
  })
  it('renders self', () => {
    expect(buttonBar.find('.buttonBarContainer').length).toBe(1)
  })
  it('skipButton enabled on the left side, when showNext === false', () => {
    const button = buttonBar.find(Button).first()
    const buttonProps = button.props()
    expect(buttonProps).toEqual({
      onClick: props.handleSkip,
      variant: 'contained',
      color: 'secondary',
      disabled: false,
      className: 'skipButton',
      children: buttonProps.children
    })
    expect(buttonProps.children).toContain('Skip')
    expect(buttonBar.find(SkipNext).length).toBe(1)
  })
  it('nextButton disabled on the right side, when showNext === false', () => {
    const button = buttonBar.find(Button).last()
    const buttonProps = button.props()
    expect(buttonProps).toEqual({
      onClick: props.handleSkip,
      variant: 'contained',
      color: 'primary',
      disabled: true,
      className: 'nextButton',
      children: buttonProps.children
    })
    expect(buttonProps.children).toContain('Next')
    expect(buttonBar.find(SkipNext).length).toBe(1)
  })
  it('skipButton disabled on the left side, when showNext === true', () => {
    props = {
      ...props,
      showNext: true
    }
    buttonBar = shallow(<ButtonBar {...props} />)
    const button = buttonBar.find(Button).first()
    const buttonProps = button.props()
    expect(buttonProps).toEqual({
      onClick: props.handleSkip,
      variant: 'contained',
      color: 'secondary',
      disabled: true,
      className: 'skipButton',
      children: buttonProps.children
    })
    expect(buttonProps.children).toContain('Skip')
    expect(buttonBar.find(SkipNext).length).toBe(1)
  })
  it('nextButton enabled on the right side, when showNext === true', () => {
    props = {
      ...props,
      showNext: true
    }
    buttonBar = shallow(<ButtonBar {...props} />)
    const button = buttonBar.find(Button).last()
    const buttonProps = button.props()
    expect(buttonProps).toEqual({
      onClick: props.handleSkip,
      variant: 'contained',
      color: 'primary',
      disabled: false,
      className: 'nextButton',
      children: buttonProps.children
    })
    expect(buttonProps.children).toContain('Next')
    expect(buttonBar.find(SkipNext).length).toBe(1)
  })
  it('skip button press should call prop handleSkip', () => {
    const button = buttonBar.find(Button).first()
    expect(props.handleSkip.mock.calls.length).toBe(0)
    button.simulate('click')
    expect(props.handleSkip.mock.calls.length).toBe(1)
  })
  it('next button press should call prop handleSkip', () => {
    props = {
      ...props,
      showNext: true
    }
    buttonBar = shallow(<ButtonBar {...props} />)
    const button = buttonBar.find(Button).first()
    expect(props.handleSkip.mock.calls.length).toBe(0)
    button.simulate('click')
    expect(props.handleSkip.mock.calls.length).toBe(1)
  })
})
