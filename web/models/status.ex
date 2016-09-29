defmodule Social.Status do
  use Social.Web, :model

  schema "status" do
    field :content, :string
    field :media, :string
    field :mentions, :string
    field :hashtags, :string
    field :owner, :integer

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:content, :media, :mentions, :hashtags, :owner])
    |> validate_required([:content, :owner])
    |> validate_length(:content, max: 140)
  end
end
