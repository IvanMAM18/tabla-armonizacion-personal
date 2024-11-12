<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LogsResource extends JsonResource
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
            'id_titulo' => $this->resource->id_titulo,
            'tipo_log' => $this->resource->tipo_log,
            'nombre_log' => $this->resource->nombre_log,
            'fecha_establecida' => $this->resource->fecha_establecida,
            'createdAt' => $this->resource->created_at->diffForHumans(),
            'edited' => $this->resource->created_at != $this->resource->updated_at,
            'user' => UserResource::make($this->whenLoaded('user')),
        ];
    }
}
