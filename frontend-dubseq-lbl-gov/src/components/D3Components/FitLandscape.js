import React, { Component } from 'react';
import axios from 'axios';
import { scaleLinear } from 'd3-scale';
import { max, min } from 'd3-array';
import { select} from 'd3-selection';
import { axisBottom, axisLeft } from 'd3-axis';
import './FitLandscape.css';

class ScoreGraph extends Component {

    constructor(props) {
        super(props)
        this.state = {
            start: 0,
            end: 0,
            fragments: [],
            genes: [],
        }
        // this.updateChart = this.updateChart.bind(this);
    }


    update = async (evt) => {

        evt.preventDefault();

        let frag_res = await axios.get("http://localhost:8080/fragview", {
            params: {
                posFrom: this.state.start,
                posTo: this.state.end
            }
        })

        let gene_res = await axios.get("http://localhost:8080/geneview", {
            params: {
                posFrom: this.state.start,
                posTo: this.state.end
            }
        })
        await this.setState({ fragments: frag_res.data, genes: gene_res.data });
        this.updateChart();
    }

    componentDidMount() {

        // Setting constants
        const wWidth = 1000
        const wHeight = 600

        // Creating margins and containers
        const margin = { top: 100, right: 20, bottom: 50, left: 50 };
        const graphWidth = wWidth - margin.left - margin.right;
        const graphHeight = wHeight - margin.top - margin.bottom;

        const svg = select('.canvas')
            .append('svg')
            .attr("width", wWidth)
            .attr("height", wHeight);

        // Creating gene chart
        const geneChart = svg.append('g')
            .attr('class', 'geneChart')
            .attr('width', graphWidth)
            .attr('height', margin.top)
            .attr('transform', `translate(${margin.left}, 50)`)

        // Creating the graph
        const fragmentChart = svg.append('g')
            .attr('class', 'fragmentChart')
            .attr('width', graphWidth)
            .attr('height', graphHeight)
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

        // Creating the graphs with axis
        fragmentChart.append('g')
            .attr('class', 'xAxisGroup')
            .attr('transform', `translate(0, ${graphHeight})`);

        fragmentChart.append('g')
            .attr('class', 'yAxisGroup')
            .attr('transfrom', `translate(${graphWidth}, 0)`);

        // Labling the X-Y axis
        fragmentChart.append("text")
            .attr("transform", `translate(${graphWidth / 2}, ${graphHeight + margin.bottom - 5})`)
            .style("text-anchor", "middle")
            .text("Position along the genome (bp)");

        fragmentChart.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left)
            .attr("x", 0 - (graphHeight / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Fragment Fitness Score");
    }

    updateChart = () => {

        // Setting constants
        const wWidth = 1000
        const wHeight = 600

        // Creating margins and containers
        const margin = { top: 100, right: 20, bottom: 50, left: 50 };
        const graphWidth = wWidth - margin.left - margin.right;
        const graphHeight = wHeight - margin.top - margin.bottom;


        // MIN-MAX for x axis
        const minGenePos = min(this.state.fragments, d => d.posFrom);
        const maxGenePos = max(this.state.fragments, d => d.posTo);

        // MIN-MAX for y axis
        const minScore = min(this.state.fragments, d => d.score);
        const maxScore = max(this.state.fragments, d => d.score);
        // const rangeScore = maxScore - minScore;

        // Setting the yScale of the data
        const yScale = scaleLinear()
            .domain([minScore, maxScore])
            .range([graphHeight, 0]);

        // Setting the xScale of the data
        const xScale = scaleLinear()
            .domain([minGenePos, maxGenePos])
            .range([0, graphWidth]);

        // Create and call all axis
        const xAxis = axisBottom(xScale);
        const yAxis = axisLeft(yScale);
        select('.xAxisGroup').call(xAxis);
        select('.yAxisGroup').call(yAxis);

        // adding fragmnets lines.
        select('.fragmentChart').selectAll('rect')
            .data(this.state.fragments)
            .enter()
            .append('rect');

        select('.fragmentChart').selectAll('rect')
            .data(this.state.fragments)
            .exit()
            .remove();

        select('.fragmentChart').selectAll('rect')
            .data(this.state.fragments)
            .attr('x', d => xScale(d.posFrom))
            .attr('y', d => yScale(d.score))
            .attr('height', 2)
            .attr('width', d => (xScale(d.posTo) - xScale(d.posFrom)))
            .attr('fill', 'grey');

        // adding genes lines.
        select('.geneChart').selectAll('rect')
            .data(this.state.genes)
            .enter()
            .append("rect");

        select('.geneChart').selectAll('rect')
            .data(this.state.genes)
            .exit()
            .remove();

        select('.geneChart').selectAll('rect')
            .data(this.state.genes)
            .attr('x', d => xScale(d.posFrom))
            .attr('height', 2)
            .attr('width', d => (xScale(d.posTo) - xScale(d.posFrom)))
            .attr('fill', 'red');

        // adding genes lables.
        select('.geneChart').selectAll('text')
            .data(this.state.genes)
            .enter()
            .append('text');

        select('.geneChart').selectAll('text')
            .data(this.state.genes)
            .exit()
            .remove();

        select('.geneChart').selectAll('text')
            .data(this.state.genes)
            .attr('x', d => xScale(d.posFrom))
            .text(d => d.name);
    }

    render() {
        return (
            <div className="card">

                <div className='card-header'>
                    <form>
                        <label for="genes">Current:</label>
                        <select id="genes" name="genes">
                            <option value="none">None</option>
                            <option value="rcna">rcnA</option>
                            <option value="rcnb">rcnB</option>
                            <option value="reca">recA</option>
                            <option value="yehb">yehB</option>
                        </select>
                    </form>
                    <form onSubmit={this.update}>
                        <label htmlFor="startSelect">start:</label>
                        <input type="number"
                            value={this.state.start}
                            id="startSelect"
                            onChange={(event) => this.setState({ start: event.target.value })}
                        />
                        <label htmlFor="endSelect">end:</label>
                        <input type="number"
                            value={this.state.end}
                            id="endSelect"
                            onChange={(event) => this.setState({ end: event.target.value })}
                        />
                        <button type="submit" className='btn btn-outline-dark'>view</button>
                    </form>
                    <div className='row'>
                        <button className='btn btn-outline-danger'>Left</button>
                        <button className='btn btn-outline-success'>Right</button>
                    </div>
                </div>
                <div className='card-body'>
                    <div className="canvas" />
                </div>
            </div>
        )
    }
}

export default ScoreGraph