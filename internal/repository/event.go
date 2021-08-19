package repository

import "github.com/porter-dev/porter/internal/models"

// ListEventOpts are the options for listing events
type ListEventOpts struct {
	ClusterID uint

	Limit int    `schema:"limit"`
	Skip  int    `schema:"skip"`
	Type  string `schema:"type"`

	// can only be "timestamp" for now
	SortBy string `schema:"sort_by"`

	OwnerType string `schema:"owner_type"`
	OwnerName string `schema:"owner_name"`

	// Decrypt is whether to decrypt the underlying Data field, which may not be desired
	// for basic list operations
	Decrypt bool
}

// EventRepository represents the set of queries on the
// Event model
type EventRepository interface {
	CreateEvent(event *models.Event) (*models.Event, error)
	ReadEvent(id uint, projID uint, clusterID uint) (*models.Event, error)
	ListEventsByProjectID(projectID uint, opts *ListEventOpts) ([]*models.Event, error)
	DeleteEvent(id uint) error
}