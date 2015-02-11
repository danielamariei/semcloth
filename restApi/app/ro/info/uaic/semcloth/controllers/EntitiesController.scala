package ro.info.uaic.semcloth.controllers

import play.api.libs.ws.WS
import play.api.mvc.{Action, Controller}
import ro.info.uaic.semcloth.db.SimpleSPARQL

object EntitiesController extends Controller {

  def events = Action {
    Ok(
      SimpleSPARQL.select(
        """select ?event ?label
          |where { ?event a dbo:Event;rdfs:label ?label . }""".stripMargin
      )
    )
  }

  def clothingTypes = Action {
    Ok(
      SimpleSPARQL.select(
        """select ?clothing ?label
          |where { ?clothing a dbr:Clothing; rdfs:label ?label . }""".stripMargin
      )
    )
  }

  def clothingSizes = Action {
    Ok(
      SimpleSPARQL.select(
        """select ?size ?label
          |where { ?size a dbr:Clothing_sizes;rdfs:label ?label . }""".stripMargin
      )
    )
  }

  def clothingStyles = Action.async {
    import play.api.Play.current
    import scala.concurrent.ExecutionContext.Implicits.global

    val result = WS.url(
      """http://dbpedia.org/sparql?default-graph-uri=http%3A%2F%2Fdbpedia.org
        |&query=PREFIX+yago%3A+%3Chttp%3A%2F%2Fdbpedia.org%2Fclass%2Fyago%2F%3E%0D%0A%0D%0ASELECT+%3F
        |dressingStyle+%3Flabel+%3Fcomment+%0D%0A++WHERE+%7B%0D%0A+++++%3FdressingStyle+a+yago%3AFashionAesthetics
        |+%3B%0D%0A+++++rdfs%3Alabel+%3Flabel%3B%0D%0A+++++rdfs%3Acomment+%3Fcomment+.%0D%0A%0D%0A+++++FILTER%28
        |lang%28%3Flabel%29+%3D+%22en%22+%26%26+lang%28%3Fcomment%29+%3D+%22en%22%29%0D%0A++%7D
        |&format=application%2Fsparql-results%2Bjson&timeout=30000""".stripMargin.replace("\n", ""))

    result.get().map{
      response =>
        Ok(response.json)
    }
  }

  def religions = Action {
    Ok(
      SimpleSPARQL.select(
        """select ?religion ?label
          |where { ?religion a dbr:Religion;rdfs:label ?label . }""".stripMargin
      )
    )
  }

  def seasons = Action {
    Ok(
      SimpleSPARQL.select(
        """select ?season ?label ?comment where
          | {?season a dbr:Season;
          |            rdfs:label ?label ;
          |            rdfs:comment ?comment
          |          FILTER (lang(?label) = 'en' && lang(?comment) = 'en') . }""".stripMargin
      )
    )
  }

  def weatherConditions = Action {
    Ok(
      SimpleSPARQL.select(
        """select ?weatherCondition ?label
          |where { ?weatherCondition a dbr:Weather;rdfs:label ?label . }""".stripMargin
      )
    )
  }

  def clothingMaterials = Action {
    Ok(
      SimpleSPARQL.select(
        """select ?clothingMaterial ?label where { {?clothingMaterial a :ClothingMaterial.} UNION {?clothingMaterial a :ClothingMaterial;
                                                                     rdfs:label ?label . }}"""
      )
    )
  }

  def colors = Action.async {

    import play.api.Play.current
    import scala.concurrent.ExecutionContext.Implicits.global
    val x = WS.url(
      """http://dbpedia.org/sparql?default-graph-uri=http%3A%2F%2Fdbpedia.org
        |&query=PREFIX+umbel%3A+%3Chttp%3A%2F%2Fumbel.org%2Fumbel%2Frc%2F%3E%0D%0A%0D%0ASELECT+%3F
        |color+%3FcolourHexCode+%3Flabel+%3Fcomment+%0D%0A++WHERE+%7B%0D%0A+++++%3Fcolor+a+umbel%3A
        |Color+%3B%0D%0A+++++dbpedia-owl%3AcolourHexCode+%3FcolourHexCode%3B%0D%0A+++++rdfs%3Alabel+%3F
        |label%3B%0D%0A+++++rdfs%3Acomment+%3Fcomment+.%0D%0A%0D%0A+++++FILTER%28lang%28%3F
        |label%29+%3D+%22en%22+%26%26+lang%28%3Fcomment%29+%3D+%22en%22%29%0D%0A++%7D
        |&format=application%2Fsparql-results%2Bjson&timeout=30000""".stripMargin.replace("\n", ""))
    x.get().map {
      response =>
        Ok(response.json)
    }
  }

}