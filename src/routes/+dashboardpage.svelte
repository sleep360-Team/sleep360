<script lang="ts">
    import { onMount } from 'svelte';
    import {
      line,
      scaleLinear,
      scaleTime,
      select,
      extent,
      max,
      axisBottom,
      axisLeft
    } from 'd3';
  
    // Define the data structure
    interface DataPoint {
      date: Date;
      value: number;
    }
  
    onMount(() => {
      const data: DataPoint[] = [
        { date: new Date('2024-01-01'), value: 65 },
        { date: new Date('2024-01-02'), value: 59 },
        { date: new Date('2024-01-03'), value: 80 },
        { date: new Date('2024-01-04'), value: 81 },
        { date: new Date('2024-01-05'), value: 56 },
      ];
  
      const margin = { top: 20, right: 30, bottom: 30, left: 40 };
      const width = 600 - margin.left - margin.right;
      const height = 400 - margin.top - margin.bottom;
  
      // Create the SVG container
      const svg = select('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
  
      // Create scales
      const x = scaleTime()
        .domain(extent(data, (d: DataPoint) => d.date) as [Date, Date])
        .range([0, width]);
  
      const y = scaleLinear()
        .domain([0, max(data, (d: DataPoint) => d.value) as number])
        .range([height, 0]);
  
      // Create axes
      svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(axisBottom(x));
  
      svg.append('g')
        .call(axisLeft(y));
  
      // Create the line generator
      const lineGenerator = line()
        .x((d: DataPoint) => x(d.date) as number)
        .y((d: DataPoint) => y(d.value) as number);
  
      // Append the line path
      svg.append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 1.5)
        .attr('d', lineGenerator);
    });
  </script>
  
  <svg></svg>
  