import { createFileRoute } from "@tanstack/react-router";
import { css } from "../../styled-system/css";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main
      className={css({
        padding: "s9",
        paddingLeft: "s10",
        color: "grey2b",
        maxWidth: "s21",
        "& p + p": {
          marginTop: "s4",
        },
      })}
    >
      <section className={css({ marginBottom: "s8" })}>
        <h1
          className={css({
            fontSize: "s9",
            fontWeight: "s3",
            paddingLeft: "0",
            marginBottom: "s5",
          })}
        >
          Tekstit liikkeessä
        </h1>

        <p>
          Tekstit liikkeessä (TeLi) -tietokanta on suunniteltu TeLi-projektille. Tähän tietokantaan on koottu bibliografisia tietoja
          suomalaisten ja venäläisten naiskirjailijoiden kirjoittamista teoksista ja niiden käännöksistä ja muusta vastaanotosta
          Venäjällä ja Suomessa.
        </p>

        <p>
          TeLi -tietokanta sisältää tällä hetkellä yli 1000 nimeä suomalaisia ja venäläisiä naiskirjailijoita, kääntäjiä, tutkijoita,
          toimittajia ja muita kulttuurialan tekijöitä. Tietokannassa on yli 6000 tietuetta.
        </p>

        <p>
          Tervetuloa käyttämään tietokantaa. Klikkaa vasemmalta ylhäältä "tekstit" tai "tekijät" kiinnostuksesi mukaan - kirjautumista
          ei tarvita.
        </p>
      </section>
      <hr />
      <section className={css({ marginTop: "s8" })}>
        <p>
          База данных TeLi создана специально для проекта TeLi — «Тексты в движении». В базе данных собраны библиографические сведения о
          произведениях, написанных финляндскими и русскими писательницами и переведённых на (соответственно) русский и финский языки, а
          также информация о самых разных вариантах их рецепции в России и Финляндии, как то статьи в научных изданиях, рецензии в
          журналах, газетах и социальных сетях (в блогах и на интернет-форумах), театральные постановки и экранизации, радио- и
          телепрограммы.
        </p>

        <p>
          База данных TeLi постоянно пополняется: на конец 2022 года в ней представлены более 1000 имён финляндских и
          русских/русскоязычных писательниц, переводчиц, исследователей, журналистов и других деятелей литературы и культуры. Общее
          количество рецепций составляет более 6000 записей.
        </p>

        <p>
          Пользование базой данных в гостевом режиме доступно без специального пароля. В разделе Tekstit (кнопка слева вверху экрана)
          можно вести поиск как по одному, так и по нескольким параметрам одновременно: автор, название произведения, издательство,
          язык, год и место издания. В разделе Tekijät, где представлены в алфавитном порядке имена писательниц, переводчиц и
          переводчиков, исследовательниц и исследователей, можно получить сразу всю информацию по конкретному автору (тексты, переводы,
          различные виды рецепций).
        </p>

        <p>Добро пожаловать в базу данных TeLi!</p>
      </section>
    </main>
  );
}
