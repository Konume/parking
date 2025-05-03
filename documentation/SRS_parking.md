
# Specyfikacja Wymagań Systemowych (SRS)  
**System Zarządzania Parkingiem Pracowniczym**  
**Wersja 1.0**  
**Autor:**Zuzanna Szymańska 
**Data:** 2025-05-03

---

## 1. Wprowadzenie

### 1.1 Cel dokumentu  
Celem niniejszego dokumentu jest formalne określenie wymagań funkcjonalnych i niefunkcjonalnych dla systemu zarządzania parkingiem pracowniczym. Dokument stanowi podstawę do projektowania, implementacji i testowania aplikacji.

### 1.2 Zakres systemu  
System umożliwia pracownikom firmy rezerwację miejsc parkingowych poprzez formularz online. Aplikacja posiada funkcje logowania, zarządzania użytkownikami, przeglądania rezerwacji oraz dedykowany panel administracyjny. System działa w przeglądarce i jest przystosowany do urządzeń mobilnych.

### 1.3 Definicje, akronimy i skróty  
- **UI** – User Interface (Interfejs użytkownika)  
- **SRS** – Software Requirements Specification (Specyfikacja Wymagań Systemowych)  
- **CRUD** – Create, Read, Update, Delete  
- **MongoDB** – nierelacyjna baza danych wykorzystywana do przechowywania danych  
- **Admin** – użytkownik o podwyższonych uprawnieniach do zarządzania systemem

### 1.4 Odniesienia  
- Repozytorium projektu: https://github.com/Konume/parking  
- IEEE 830-1998 – Recommended Practice for Software Requirements Specifications  
- OWASP Foundation – wytyczne dotyczące bezpieczeństwa aplikacji webowych

---

## 2. Opis ogólny

### 2.1 Perspektywa systemu  
System jest aplikacją webową typu klient-serwer, zbudowaną w oparciu o Node.js (backend) i React (frontend), z wykorzystaniem bazy danych MongoDB Atlas. Architektura aplikacji jest podzielona na moduły: autoryzacja, zarządzanie użytkownikami, obsługa rezerwacji i panel administratora.

### 2.2 Funkcje systemu  
- Rejestracja i logowanie użytkowników  
- Rezerwacja dostępnych miejsc parkingowych  
- Wyświetlanie aktualnych rezerwacji w czasie rzeczywistym  
- Zarządzanie użytkownikami przez administratora  
- Przegląd rezerwacji i historii użytkowników  
- Bezpieczne przechowywanie danych

### 2.3 Użytkownicy systemu  
- **Użytkownik** – pracownik zarejestrowany w systemie, może dokonywać rezerwacji  
- **Administrator** – osoba zarządzająca systemem, może tworzyć i usuwać konta, przeglądać wszystkie rezerwacje

### 2.4 Ograniczenia  
- System wymaga połączenia z Internetem  
- Dostęp do systemu możliwy tylko po zalogowaniu  
- System operuje na danych z jednego parkingu (brak geolokalizacji)

---

## 3. Wymagania funkcjonalne

**F1.** System umożliwia rejestrację i logowanie użytkowników.  
**F2.** Tylko zalogowani użytkownicy mogą korzystać z systemu.  
**F3.** Użytkownik może zarezerwować dostępne miejsce parkingowe na wybrany dzień i godzinę.  
**F4.** System wyświetla rezerwacje w czasie rzeczywistym, zapobiegając kolizjom.  
**F5.** Użytkownik może sprawdzić swoje aktywne i archiwalne rezerwacje.  
**F6.** Administrator może przeglądać listę wszystkich użytkowników i ich rezerwacji.  
**F7.** Administrator może tworzyć, edytować i usuwać konta użytkowników.  
**F8.** System waliduje dane wejściowe formularzy.

---

## 4. Wymagania niefunkcjonalne

**NF1.** Interfejs użytkownika musi być responsywny i dostępny na urządzeniach mobilnych.  
**NF2.** System musi przechowywać dane użytkowników i rezerwacji w sposób bezpieczny (np. szyfrowane hasła).  
**NF3.** System powinien zapewniać minimalny czas reakcji interfejsu (poniżej 1 sekundy dla typowych operacji).  
**NF4.** Aplikacja musi być skalowalna – powinna obsłużyć minimum 100 jednoczesnych użytkowników.  
**NF5.** Kod źródłowy powinien być podzielony modułowo, zgodnie z zasadami dobrej architektury aplikacji webowych.

---

## 5. Załączniki  
- Link do repozytorium: https://github.com/Konume/parking
