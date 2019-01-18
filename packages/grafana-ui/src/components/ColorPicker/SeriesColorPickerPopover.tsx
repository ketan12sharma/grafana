import React from 'react';
import { ColorPickerPopover } from './ColorPickerPopover';
import { GrafanaTheme } from '../../types';

export interface SeriesColorPickerPopoverProps {
  color: string;
  yaxis?: number;
  onColorChange: (color: string) => void;
  onToggleAxis?: () => void;
  theme?: GrafanaTheme;
}

export class SeriesColorPickerPopover extends React.PureComponent<SeriesColorPickerPopoverProps, any> {
  render() {
    return (
      <div>
        <ColorPickerPopover theme={this.props.theme} color={this.props.color} onColorSelect={this.props.onColorChange}>
          <div style={{ marginTop: '32px' }}>
            {this.props.yaxis && <AxisSelector yaxis={this.props.yaxis} onToggleAxis={this.props.onToggleAxis} />}
          </div>
        </ColorPickerPopover>
      </div>
    );
  }
}

interface AxisSelectorProps {
  yaxis: number;
  onToggleAxis?: () => void;
}

interface AxisSelectorState {
  yaxis: number;
}

export class AxisSelector extends React.PureComponent<AxisSelectorProps, AxisSelectorState> {
  constructor(props: AxisSelectorProps) {
    super(props);
    this.state = {
      yaxis: this.props.yaxis,
    };
    this.onToggleAxis = this.onToggleAxis.bind(this);
  }

  onToggleAxis() {
    this.setState({
      yaxis: this.state.yaxis === 2 ? 1 : 2,
    });

    if (this.props.onToggleAxis) {
      this.props.onToggleAxis();
    }
  }

  render() {
    const leftButtonClass = this.state.yaxis === 1 ? 'btn-success' : 'btn-inverse';
    const rightButtonClass = this.state.yaxis === 2 ? 'btn-success' : 'btn-inverse';

    return (
      <div className="p-b-1">
        <label className="small p-r-1">Y Axis:</label>
        <button onClick={this.onToggleAxis} className={'btn btn-small ' + leftButtonClass}>
          Left
        </button>
        <button onClick={this.onToggleAxis} className={'btn btn-small ' + rightButtonClass}>
          Right
        </button>
      </div>
    );
  }
}
