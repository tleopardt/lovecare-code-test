import { AxiosResponse } from "axios";
import { API_URL } from "~/config/api";
import { extractParams } from "~/utils/helpers";

export type CharactersApiProps = {
  page: number;
  species: string;
  status: string;
  gender: string;
  name: string;
}

export async function getListCharacter(filter: CharactersApiProps): Promise<false | AxiosResponse> {
    try {
        const params = await extractParams(filter);

        const response = await API_URL.get(`character${params}`);
        
        return response;
    } catch (err) {
        return false;
    }
}

export async function getCharacterDetails(id: number): Promise<false | AxiosResponse> {
    try {
        const response = await API_URL.get(`character/${id}`);

        return response;
    } catch (err) {
        return false;
    }
}

export async function getCharacterEpisodes(episode: Array<number>): Promise<false | AxiosResponse> {
    try {
        const response = await API_URL.get(`episode/${episode}`);

        return response;
    } catch (err) {
        return false;
    }
}