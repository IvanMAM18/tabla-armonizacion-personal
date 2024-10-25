<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TablaDataArmonizacionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->resource->id,
            'clasificacion' => $this->resource->clasificacion,
            'puntosOne' => $this->resource->puntosOne,
            'puntosTwo' => $this->resource->puntosTwo,
            'archivo' => $this->resource->archivo,
            'formato' => $this->resource->formato,
            'edited' => $this->resource->created_at != $this->resource->updated_at,
            'user' => UserResource::make($this->whenLoaded('user')),
        ];
    }
}