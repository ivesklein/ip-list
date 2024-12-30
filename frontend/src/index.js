import * as d3 from 'd3';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { countryCodes } from './country-codes.js';

// Initialize the map only once
const map = L.map('map').setView([51.505, -0.09], 2);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const main = async () => {

    // Fetch data from the API
    const response = await fetch(`${API_URL}/ips/`);
    const ips = await response.json();

    let filterApplied = ['Confiable', 'Sospechosa', 'Maliciosa'];
    let findText = '';

    const applyFilter = (selected) => {
        if(selected === 'Confiable') {
            if(filterApplied.includes('Confiable')) {
                filterApplied = filterApplied.filter(item => item !== 'Confiable');
            } else {
                filterApplied.push('Confiable');
            }
        }else if(selected === 'Sospechosa') {
            if(filterApplied.includes('Sospechosa')) {
                filterApplied = filterApplied.filter(item => item !== 'Sospechosa');
            } else {
                filterApplied.push('Sospechosa');
            }
        }else if(selected === 'Maliciosa') {
            if(filterApplied.includes('Maliciosa')) {
                filterApplied = filterApplied.filter(item => item !== 'Maliciosa');
            } else {
                filterApplied.push('Maliciosa');
            }
        }
        update();
    }

    const update = () => {

        let filteredIps = ips.filter(ip => filterApplied.includes(ip.category));

        if(findText !== '') {
            // filter ips by ip, country, or endpoint, case insensitive
            filteredIps = filteredIps.filter(ip => {
                return ip.ip.toLowerCase().includes(findText.toLowerCase()) ||
                    ip.country.toLowerCase().includes(findText.toLowerCase()) ||
                    ip.endpoint.toLowerCase().includes(findText.toLowerCase());
            });
        }

        // sort by date decreasing
        filteredIps.sort((a, b) => {
            return (new Date(b.date)) - (new Date(a.date));
        });

        // update the buttons
        document.querySelectorAll('.filter-button').forEach(button => {
            // add class active if the filter is applied (data-category)
            if(filterApplied.includes(button.dataset.category)) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });

        // remove all items from #ip-list
        document.querySelector('#ip-list').innerHTML = '';

        filteredIps.forEach(ip => {

            // add to #ip-list item based on the template #item-template
            const template = document.querySelector('#item-template');
            const clone = template.content.cloneNode(true);
            const item = clone.querySelector('.t-category');
            item.classList.add(`category-${ip.category.toLowerCase()}`);
            const icon = clone.querySelector('.t-icon');
            // add class based on category
            if(ip.category === 'Confiable') {
                icon.classList.add('fa-shield-alt');
            } else if(ip.category === 'Sospechosa') {
                icon.classList.add('fa-exclamation-triangle');
            } else {
                icon.classList.add('fa-times-circle');
            }
            const date = clone.querySelector('.t-date');
            date.textContent = ip.date;
            const ipElement = clone.querySelector('.t-ip');
            ipElement.textContent = ip.ip;
            const country = clone.querySelector('.t-country');
            country.textContent = ip.country;
            const url = clone.querySelector('.t-url');
            url.textContent = ip.endpoint;

            document.querySelector('#ip-list').appendChild(clone);

        });

        // update the map
        choroplethRender(filteredIps);

    }

    // add event listener to the buttons
    document.querySelectorAll('.filter-button').forEach(button => {
        button.addEventListener('click', () => {
            applyFilter(button.dataset.category);
        });
    });

    let lastStroke = null;
    // add event listener to find input
    document.querySelector('#find-input').addEventListener('input', () => {
        findText = document.querySelector('#find-input').value;
        // wait 300ms before updating
        clearTimeout(lastStroke);
        lastStroke = setTimeout(() => {
            update();
        }, 300);
    });

    // initial update
    update();

}

const choroplethRender = (ips) => {
    // group by country
    const grouped = ips.reduce((acc, ip) => {
        const cc = countryCodes[ip.country];
        if(!acc[cc]) {
            acc[cc] = 0;
        }
        acc[cc]++;
        return acc;
    }, {});

    console.log(grouped);

    // get the maximum value
    const max = Math.max(...Object.values(grouped));

    // create a color scale
    const color = d3.scaleSequential(d3.interpolateOranges)
        .domain([0, max]);

    // Clear existing layers
    map.eachLayer((layer) => {
        if (layer instanceof L.TileLayer) return; // Keep the tile layer
        map.removeLayer(layer);
    });

    // add a country layer using dist/countries.geo.json
    fetch('./countries.geo.json')
        .then(response => response.json())
        .then(geojson => {
            L.geoJson(geojson, {
                style: (feature) => {
                    const cc = feature.id;
                    const value = grouped[cc] || 0;
                    return {
                        fillColor: color(value),
                        weight: 1,
                        opacity: 1,
                        color: 'white',
                        fillOpacity: 0.8
                    };
                },
                onEachFeature: (feature, layer) => {
                    const cc = feature.id;
                    const value = grouped[cc] || 0;
                    layer.bindPopup(`${feature.properties.name}: ${value}`);
                }
            }).addTo(map);
        });


}

main();