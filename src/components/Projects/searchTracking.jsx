import { Card } from 'react-bootstrap';
import Plot from 'react-plotly.js';
import searches from '../../data/predictions.json';
import '../TabComponents/tabstyles.css';
import './searchTracking.css';

export function SearchTracking() {
  const wikiClasses = [
    "Computer hardware",
    "Internet",
    "Software",
    "Games",
    "Entertainment",
    "Science",
    "Technology",
    "Law",
    "Politics",
    "Books",
    "Investment",
    "Food and drink",
    "Health",
    "Animals",
  ];

  const wikiClassIndexes = Object.assign({}, ...wikiClasses.map((i, w) => {
    return { [i]: w };
  }));
  // const wikiClassColors = Object.assign({}, ...wikiClasses.map((i, w) => {
  //   return { [i]: (`hsl(${(w * 24) % 360},${Math.max((w * 105 + 50) % 100, 50)},${Math.max((w * 105 + 50) % 100, 50)})`) };
  // }));
  function isValidDate(d) {
    return d instanceof Date && !isNaN(d);
  }
  function getMonth(d) {
    if (typeof (d) !== 'string') {
      const timestamp = parseInt(d) / 1000;
      const date = new Date(timestamp);
      if (isValidDate(date)) {
        const dateString = date.toISOString().split('T')[0].split('-').slice(0, 2).join('-')
        return dateString;
      }
    } else {
      return d;
    }
  }
  const dateVals = searches.map((entry) => {
    const month = getMonth(entry['last_visit_date']);
    entry['last_visit_date'] = month;
    return month;
  }).filter((d) => d !== "Invalid Date NaN");

  const dedupItems = [...new Set(dateVals)].sort();
  dedupItems.splice(dedupItems.length - 2, 2);
  console.log(dedupItems)

  const searchMatrix = new Array(wikiClasses.length).fill(0).map(() => new Array(dedupItems.length).fill(0));

  wikiClasses.forEach((wikiClass) => {
    const dedupMapper = Object.assign({}, ...dedupItems.map((i) => {
      return { [i]: 0 }
    }));
    searches.filter((s) => s.classification.labels[0] === wikiClass).forEach((search) => {
      dedupMapper[search.last_visit_date] += 3
    });
    searches.filter((s) => s.classification.labels[1] === wikiClass).forEach((search) => {
      dedupMapper[search.last_visit_date] += 2
    });
    searches.filter((s) => s.classification.labels[2] === wikiClass).forEach((search) => {
      dedupMapper[search.last_visit_date] += 1
    });
    searchMatrix[wikiClassIndexes[wikiClass]] = [...Object.values(dedupMapper)];
  });

  const traces = wikiClasses.map((wikiClass) => {
    let trace = {
      x: Array.from(dedupItems),
      y: searchMatrix[wikiClassIndexes[wikiClass]].slice(),
      stackgroup: 'one',
      name: wikiClass,
      type: 'scatter',
      line: {
        // color: wikiClassColors[wikiClass],
        width: 0
      }
    };
    return trace;
  });

  return (<>
    <div style={{ height: '100vh', width: '100vw' }}>
      <div class="d-flex justify-content-center">
        <Plot
          data={
            traces
          }
          layout={{ autosize: false, responsive: true, width: '800', height: '500', title: 'Web Queries by Category' }}
        />
      </div>
      <div class="d-flex justify-content-center" style={{ paddingTop: "2vh" }}>
        <Card className='search-tracking-card card-subtitle card-pretty center'>
          <p style={{ textAlign: 'center', fontSize: '20px' }}>
            Above is a graph displaying my web searches by category for the last several months.
            It was created by pulling my browsing history and feeding all the search queries through
            the <a href="https://huggingface.co/facebook/bart-large-mnli">bart-large-mnli</a> zero-shot classification model.
          </p>
        </Card>
      </div>
    </div>
  </>
  );
}
