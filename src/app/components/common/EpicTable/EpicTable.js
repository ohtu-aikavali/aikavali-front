import React, { Component } from 'react'
import EnhancedTableHead from './EnhancedTableHead'
import TableToolbar from './TableToolbar'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Checkbox from '@material-ui/core/Checkbox'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import { stableSort, getSorting } from '../../../utilities/sortByField'
import '../../Admin/admin.css'

// Anna tälle komponentille propseina data (esim. kysymykset, flaggedQuestions)
class EpicTable extends Component {
  constructor () {
    super()
    this.state = {
      order: 'desc',
      orderBy: null,
      selected: [],
      data: [],
      expanded: false,
      showFilterInput: false,
      filterValue: ''
    }
  }
  // This is needed. For example, if u press "previous" on browser, and then "next", the state would be empty
  static getDerivedStateFromProps = (props, state) => {
    // First render
    if (state.orderBy === null) {
      return {
        orderBy: props.defaultOrder,
        data: props.data
      }
    }
    // If deleted, then set selected to empty array
    if (props.data.length < state.data.length) {
      return {
        data: props.data,
        selected: [],
        expanded: false
      }
    }
    if (props.data !== state.data) {
      return {
        data: props.data
      }
    }
    return null
  }

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }))
      this.props.updateCheckCount(this.state.data.length)
      return
    }
    this.setState({ selected: [] })
    this.props.updateCheckCount(0)
  }
  handleRequestSort = (event, property) => {
    const orderBy = property
    let order = 'desc'

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc'
    }

    this.setState({ order, orderBy })
  }
  isSelected = id => this.state.selected.indexOf(id) !== -1

  handleClick = (event, id) => {
    const { selected } = this.state
    const selectedIndex = selected.indexOf(id)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      )
    }
    this.setState({ selected: newSelected })
    this.props.updateCheckCount(newSelected.length)
  }
  handleExpand = (id) => {
    this.setState({ expanded: this.state.expanded === id ? false : id })
  }
  onFilterClick = () => {
    this.setState({ showFilterInput: !this.state.showFilterInput })
  }
  onFilterChange = (event) => {
    this.setState({ filterValue: event.target.value })
  }
  handleFiltering = () => {
    if (this.state.filterValue === '') {
      return this.state.data
    }
    let newData = []
    this.state.data.forEach(d => {
      if (this.asString(d).indexOf(this.state.filterValue.toLowerCase()) !== -1) {
        newData.push(d)
      }
    })
    return newData
  }
  asString = (d) => {
    let { rows } = this.props
    let string = ''
    rows.forEach(r => {
      string += d[r.id] + ' '
    })
    return string.toLowerCase()
  }
  handleButton1Click = () => {
    let selected = this.state.data.filter(d => this.state.selected.indexOf(d.id) !== -1)
    this.props.toolbarButton1Click(selected)
  }
  handleButton2Click = () => {
    let selected = this.state.data.filter(d => this.state.selected.indexOf(d.id) !== -1)
    this.props.toolbarButton2Click(selected)
  }
  wrapText = (text) => {
    if (text.length > 13) {
      let wrapped = ''
      for (let i = 0; i < 13; i++) {
        wrapped += text[i]
      }
      return wrapped + '...'
    }
    return text
  }
  render () {
    let { data, orderBy } = this.state
    const keyStart1 = data.length
    const keyStart2 = data.length * 2
    let i = 0
    let j = 0
    const { order, selected, filterValue } = this.state
    const { rows, title, toolbarButton1Text, toolbarButton2Text, toolbarButton1Tooltip, toolbarButton2Tooltip } = this.props
    data = this.handleFiltering()
    return (
      <Paper style={{ width: '96%', margin: '2%' }}>
        <TableToolbar
          numSelected={selected.length}
          onFilterClick={this.onFilterClick}
          showFilterInput={this.state.showFilterInput}
          filterValue={filterValue}
          onFilterChange={this.onFilterChange}
          handleButton1Click={this.handleButton1Click}
          handleButton2Click={this.handleButton2Click}
          title={title}
          toolbarButton1Text={toolbarButton1Text}
          toolbarButton2Text={toolbarButton2Text}
          toolbarButton1Tooltip={toolbarButton1Tooltip}
          toolbarButton2Tooltip={toolbarButton2Tooltip}
        />
        <div style={{ overflowX: 'auto' }}>
          <Table style={{ minWidth: 350 }} aria-labelledby='tableTitle'>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
              rows={rows}
            />
            <TableBody>
              {stableSort(data, getSorting(order, orderBy)).map(n => {
                i++
                const isSelected = this.isSelected(n.id)
                return (
                  <React.Fragment key={keyStart1 + i}>
                    <TableRow
                      hover
                      role='checkbox'
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}
                      style={{ width: '100%' }}
                    >
                      <TableCell
                        padding='checkbox'
                        onClick={event => this.handleClick(event, n.id)}
                      >
                        <Checkbox checked={isSelected} />
                      </TableCell>
                      {rows.map(r => {
                        j++
                        return (
                          <TableCell key={keyStart2 + j} onClick={() => this.handleExpand(n.id)}><Typography noWrap>{r.id === 'value' ? this.wrapText(n[r.id]) : n[r.id]}</Typography></TableCell>
                        )
                      })}
                    </TableRow>
                    {this.props.expandable && (
                      <TableRow
                        key={n}
                        style={{ height: this.state.expanded === n.id ? null : 0 }}
                        hover
                        role='checkbox'
                        tabIndex={-1}
                        aria-checked={isSelected}
                        selected={isSelected}
                      >
                        <TableCell colSpan={rows.length + 1} padding='none'>
                          <ExpansionPanel style={{ background: 'transparent' }} expanded={this.state.expanded === n.id} onChange={() => this.handleExpand(n.id)}>
                            <ExpansionPanelDetails>
                              {this.props.expandableContent(n._id)}
                            </ExpansionPanelDetails>
                          </ExpansionPanel>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </Paper>
    )
  }
}

export default EpicTable
