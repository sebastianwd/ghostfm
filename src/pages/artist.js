import React, { useEffect, useState } from "react"
import SEO from "../components/seo"
import useApi from "../components/hooks/useApi"
import { Container, Segment, Grid } from "semantic-ui-react"

const Artist = ({ location, name }) => {
  const [{ isLoading }, getArtistByName] = useApi()
  const [infoState, setInfoState] = useState(null)

  useEffect(() => {
    if (!location.state || !location.state.idArtist) {
      getArtistByName(name).then(data => {
        if (data) {
          setInfoState(data)
        }
      })
    } else {
      setInfoState(location.state)
    }
  }, [])

  return (
    <Container fluid>
      <Grid stackable columns={2} divided>
        <Grid.Row stretched>
          <Grid.Column computer={10}>
            <Segment>1</Segment>
            <Segment>1</Segment>
            <Segment>2</Segment>
            <Segment>3</Segment>
          </Grid.Column>
          <Grid.Column computer={6}>
            <Segment>1</Segment>
            <Segment>2</Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  )
}

export default Artist
