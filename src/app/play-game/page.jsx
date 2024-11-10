import Main from "@/layouts/Main";
import Header from "@/components/Header";
import Button from "@/components/Button";

import styles from "./page.module.css";

function page() {
  return (
    <Main>
      <div className={styles.page}>
        <Header text="Game 1" />
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th data-cell="name">Round</th>
                <th data-cell="round-1">1</th>
                <th>2</th>
                <th>3</th>
                <th>4</th>
                <th>5</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td data-cell="name">Max Verstappen</td>
                <td data-cell="round-1">
                  <div className={styles.cellContainer}>
                    <span>0</span>
                    <span>1</span>
                  </div>
                </td>
                <td data-cell="podiums">
                  {" "}
                  <span>0</span>
                  <span>1</span>
                </td>
                <td data-cell="wins">
                  {" "}
                  <span>0</span>
                  <span>1</span>
                </td>
                <td data-cell="career points">
                  {" "}
                  <span>0</span>
                  <span>1</span>
                </td>
                <td data-cell="championships">
                  {" "}
                  <span>0</span>
                  <span>1</span>
                </td>
              </tr>
              <tr>
                <td data-cell="name">Lewis Hamilton</td>
                <td data-cell="poles">103</td>
                <td data-cell="podiums">192</td>
                <td data-cell="wins">103</td>
                <td data-cell="career points">4443.5</td>
                <td data-cell="championships">7</td>
              </tr>
              <tr>
                <td data-cell="name">Rico Rosberg</td>
                <td data-cell="poles">30</td>
                <td data-cell="podiums">57</td>
                <td data-cell="wins">23</td>
                <td data-cell="career points">1594.5</td>
                <td data-cell="championships">1</td>
              </tr>
              <tr>
                <td data-cell="name">Sebastian Vettle</td>
                <td data-cell="poles">57</td>
                <td data-cell="podiums">122</td>
                <td data-cell="wins">53</td>
                <td data-cell="career points">3098</td>
                <td data-cell="championships">4</td>
              </tr>
              <tr>
                <td data-cell="name">Jenson Button</td>
                <td data-cell="poles">8</td>
                <td data-cell="podiums">50</td>
                <td data-cell="wins">15</td>
                <td data-cell="career points">1235</td>
                <td data-cell="championships">1</td>
              </tr>
              <tr>
                <td data-cell="name">Kimi Raikkonen</td>
                <td data-cell="poles">18</td>
                <td data-cell="podiums">103</td>
                <td data-cell="wins">21</td>
                <td data-cell="career points">1873</td>
                <td data-cell="championships">1</td>
              </tr>
              <tr>
                <td data-cell="name">Fernando Alonso</td>
                <td data-cell="poles">22</td>
                <td data-cell="podiums">101</td>
                <td data-cell="wins">32</td>
                <td data-cell="career points">2106</td>
                <td data-cell="championships">2</td>
              </tr>
              <tr>
                <td data-cell="name">Michael Schmacher</td>
                <td data-cell="poles">68</td>
                <td data-cell="podiums">155</td>
                <td data-cell="wins">91</td>
                <td data-cell="career points">1566</td>
                <td data-cell="championships">7</td>
              </tr>
              <tr>
                <td data-cell="name">Mika Haekkinen</td>
                <td data-cell="poles">26</td>
                <td data-cell="podiums">51</td>
                <td data-cell="wins">20</td>
                <td data-cell="career points">420</td>
                <td data-cell="championships">2</td>
              </tr>
              <tr>
                <td data-cell="name">Jacques Villeneuve</td>
                <td data-cell="poles">13</td>
                <td data-cell="podiums">23</td>
                <td data-cell="wins">11</td>
                <td data-cell="career points">235</td>
                <td data-cell="championships">1</td>
              </tr>
              <tr>
                <td data-cell="name">Darnon Hill</td>
                <td data-cell="poles">20</td>
                <td data-cell="podiums">42</td>
                <td data-cell="wins">22</td>
                <td data-cell="career points">360</td>
                <td data-cell="championships">1</td>
              </tr>
              <tr>
                <td data-cell="name">Alain Prost</td>
                <td data-cell="poles">33</td>
                <td data-cell="podiums">106</td>
                <td data-cell="wins">51</td>
                <td data-cell="career points">768.5</td>
                <td data-cell="championships">4</td>
              </tr>
              <tr>
                <td data-cell="name">Nigel Mansell</td>
                <td data-cell="poles">32</td>
                <td data-cell="podiums">59</td>
                <td data-cell="wins">31</td>
                <td data-cell="career points">480</td>
                <td data-cell="championships">1</td>
              </tr>
              <tr>
                <td data-cell="name">Ayrton Senna</td>
                <td data-cell="poles">65</td>
                <td data-cell="podiums">80</td>
                <td data-cell="wins">41</td>
                <td data-cell="career points">610</td>
                <td data-cell="championships">3</td>
              </tr>
            </tbody>
          </table>
        </div>
        <Button text="Advance to Next Round" />
        <Button type="secondary" text="Save and Exit" />
      </div>
    </Main>
  );
}

export default page;
