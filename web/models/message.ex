defmodule Social.Message do
  use Social.Web, :model

  schema "messages" do
    field :from, :string
    field :to, :string
    field :content, :string

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:from, :to, :content])
    |> validate_required([:from, :to, :content])
  end
end
