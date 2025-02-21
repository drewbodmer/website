import axios from "axios";

export function SearchUpload() {
  return (
    <div>
      <form
        onSubmit={(e: React.SyntheticEvent) => {
          e.preventDefault();
          const target = e.target as typeof e.target & {
            json: { value: Array<JSON> };
          };
          const json = target.json.value;
          const token = localStorage.getItem('token');
          axios.post('http://localhost:8000/api/v1/update_db/', json, {
            headers: {
              'content-type': 'application/json', 'token': (token as string)
            }
          })
            .then(response => {
              // if (response.status === 200) {
              console.log(response);
              // }
            });
        }}
      >
        <label>
          JSON:
          <input type="json" name="json" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}