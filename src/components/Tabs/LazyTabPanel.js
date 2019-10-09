import React, { useState, useEffect } from "react"
import { TabPanel } from "react-tabs"

const LazyTabPanel = props => {
  const [initialized, setInitialized] = useState(false)
  useEffect(() => {
    if (props.selected && !initialized) {
      setInitialized(true)
    }
  }, [props.selected, initialized])

  return <TabPanel forceRender={initialized} {...props} />
}
LazyTabPanel.tabsRole = "TabPanel"

export default LazyTabPanel
