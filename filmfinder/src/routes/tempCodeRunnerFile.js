<Column title="Movie" dataIndex="movieName" key="movieName" />
            <Column
              title="Review Time"
              dataIndex="reviewTime"
              key="reviewTime"
            />

            <Column
              title="Rating"
              dataIndex="rating"
              key="rating"
              render={(text, record) => (
                <Rate disabled allowHalf defaultValue={0} value={parseFloat(record.rating)}/>
              )}
            />

            {/* <Column
              title="Rating"
              dataIndex="rating"
              key="rating"      
              render={(text, record) => (
              <h1>{record.rating}</h1>
              )}
            /> */}
            
            <Column title="Review Content" dataIndex="review" key="review" />